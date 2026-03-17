import os
import sys
import json
import logging
import smtplib
import cloudinary
import cloudinary.uploader
from datetime import datetime, timedelta
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status, BackgroundTasks, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from jose import JWTError, jwt

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# ─── 0. Load .env ─────────────────────────────────────────────────────────────
load_dotenv()

# ─── 1. Logging ───────────────────────────────────────────────────────────────
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=getattr(logging, LOG_LEVEL, logging.INFO))
logger = logging.getLogger(__name__)

# ─── 2. Config & Validation ───────────────────────────────────────────────────
SMTP_USER        = os.getenv("SMTP_USER")
SMTP_PASS        = os.getenv("SMTP_PASS")
SALES_EMAIL      = os.getenv("SALES_EMAIL")
MONGO_URI        = os.getenv("MONGO_URI")
JWT_SECRET       = os.getenv("JWT_SECRET", "change-this-secret")
ADMIN_EMAIL      = os.getenv("ADMIN_EMAIL")
ADMIN_PASS       = os.getenv("ADMIN_PASS")
CLOUDINARY_CLOUD = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_KEY   = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_SEC   = os.getenv("CLOUDINARY_API_SECRET")

missing = [v for v in ["SMTP_USER", "SMTP_PASS", "SALES_EMAIL", "MONGO_URI", "ADMIN_EMAIL", "ADMIN_PASS"] if not os.getenv(v)]
if missing:
    logger.critical(f"Missing env vars: {', '.join(missing)}. Exiting.")
    sys.exit(1)

# ─── 3. Cloudinary Setup ──────────────────────────────────────────────────────
cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD,
    api_key=CLOUDINARY_KEY,
    api_secret=CLOUDINARY_SEC,
)

# ─── 4. Auth Helpers ──────────────────────────────────────────────────────────
bearer = HTTPBearer()

def create_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(hours=12)
    return jwt.encode({"sub": email, "exp": expire}, JWT_SECRET, algorithm="HS256")

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ─── 5. FastAPI App ───────────────────────────────────────────────────────────
app = FastAPI(
    title="Annika Technologies API",
    description="Production API — MongoDB + JWT + Cloudinary",
    version="2.0.0",
    redirect_slashes=False,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://annika-technologies.com",
        "https://www.annika-technologies.com",
        "https://annika-website.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── 6. MongoDB Connection ────────────────────────────────────────────────────
client        = AsyncIOMotorClient(MONGO_URI)
db_           = client["annika_db"]
products_col  = db_["products"]
inquiries_col = db_["inquiries"]

# ─── 7. Email Helpers ─────────────────────────────────────────────────────────
def get_html_template(title: str, fields: dict) -> str:
    rows = "".join([
        f"<tr><td style='padding:10px;border-bottom:1px solid #eee;width:150px'><b>{k}:</b></td>"
        f"<td style='padding:10px;border-bottom:1px solid #eee'>{v}</td></tr>"
        for k, v in fields.items()
    ])
    return f"""
    <html><body style="font-family:'Segoe UI',Arial,sans-serif;color:#333;margin:0;padding:0">
      <div style="max-width:600px;margin:20px auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#1a3a5a;color:#fff;padding:25px;text-align:center">
          <h2 style="margin:0;letter-spacing:1px">{title}</h2>
        </div>
        <div style="padding:30px">
          <table style="width:100%;border-collapse:collapse">{rows}</table>
        </div>
        <div style="background:#f8f9fa;color:#666;padding:15px;text-align:center;font-size:12px;border-top:1px solid #eee">
          © {datetime.utcnow().year} Annika Technologies | Automated Notification
        </div>
      </div>
    </body></html>"""

def send_email(subject: str, html_body: str, reply_to: str = "") -> bool:
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = f"Annika Technologies <{SALES_EMAIL}>"
        msg["To"]      = SALES_EMAIL
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.attach(MIMEText(html_body, "html"))
        with smtplib.SMTP("smtp.hostinger.com", 587) as s:
            s.ehlo(); s.starttls(); s.ehlo()
            s.login(SMTP_USER, SMTP_PASS)
            s.sendmail(SALES_EMAIL, SALES_EMAIL, msg.as_string())
        logger.info(f"Email sent: {subject}")
        return True
    except Exception as e:
        logger.error(f"Email failed: {e}")
        return False

# ─── 8. Pydantic Models ───────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProductIn(BaseModel):
    title: str
    category: str
    desc: str
    image: Optional[str] = ""
    in_stock: bool = True

class InquiryStatusUpdate(BaseModel):
    status: str

class ContactInquiry(BaseModel):
    user_name:  str      = Field(..., min_length=2, max_length=50)
    user_email: EmailStr
    company:    Optional[str] = Field(None, max_length=100)
    phone:      Optional[str] = Field(None, max_length=20)
    message:    str      = Field(..., min_length=10, max_length=1000)

class DatasheetRequest(BaseModel):
    user_name:     str      = Field(..., min_length=2, max_length=50)
    user_email:    EmailStr
    company:       Optional[str] = Field(None, max_length=100)
    phone:         Optional[str] = Field(None, max_length=20)
    product_title: str      = Field(..., max_length=100)
    message:       Optional[str] = Field(None, max_length=1000)

class CustomSpecsInquiry(BaseModel):
    user_name:    str      = Field(..., min_length=2, max_length=50)
    user_email:   EmailStr
    phone:        Optional[str] = Field(None, max_length=20)
    product_type: str      = Field(..., max_length=50)
    specs:        str      = Field(..., min_length=10, max_length=2000)

# ─── 9. Helper: serialize MongoDB doc ────────────────────────────────────────
class MongoJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder that handles ObjectId and datetime from MongoDB."""
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

def serialize(doc) -> dict:
    """Convert a MongoDB document to a JSON-safe dict.
    Stringifies ALL ObjectId fields (not just _id) and converts datetimes.
    """
    if not doc:
        return doc
    doc = dict(doc)
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
        elif isinstance(value, datetime):
            doc[key] = value.isoformat()
    # Rename _id → id
    if "_id" in doc:
        doc["id"] = doc.pop("_id")
    return doc

def mongo_response(data) -> JSONResponse:
    """Safely encode a list or dict containing MongoDB data to a JSONResponse."""
    return JSONResponse(content=json.loads(json.dumps(data, cls=MongoJSONEncoder)))

# ─── 10. System Routes ────────────────────────────────────────────────────────
@app.get("/", tags=["System"])
@app.get("/health", tags=["System"])
async def health():
    return {"status": "running", "version": "2.0.0", "timestamp": datetime.utcnow().isoformat()}

# ─── 11. Auth Routes ──────────────────────────────────────────────────────────
@app.post("/auth/login", tags=["Auth"])
async def login(body: LoginRequest):
    if body.email != ADMIN_EMAIL or body.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(body.email)
    return {"access_token": token, "token_type": "bearer"}

# ─── 12. Product Routes ───────────────────────────────────────────────────────
@app.get("/api/products", tags=["Catalog"])
async def get_products(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    cursor = products_col.find(query).sort("created_at", -1)
    docs = [serialize(p) async for p in cursor]
    return mongo_response(docs)

@app.post("/api/products", status_code=201, tags=["Catalog"])
async def add_product(product: ProductIn, _: str = Depends(verify_token)):
    doc = product.dict()
    doc["created_at"] = datetime.utcnow()
    result = await products_col.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)  # remove raw _id if present
    # convert any remaining datetime for safe JSON return
    doc["created_at"] = doc["created_at"].isoformat()
    return doc

@app.put("/api/products/{product_id}", tags=["Catalog"])
async def update_product(product_id: str, product: ProductIn, _: str = Depends(verify_token)):
    update_data = product.dict()
    result = await products_col.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "updated"}

@app.delete("/api/products/{product_id}", tags=["Catalog"])
async def delete_product(product_id: str, _: str = Depends(verify_token)):
    result = await products_col.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}

# ─── 13. Image Upload (Cloudinary) ───────────────────────────────────────────
@app.post("/api/upload", tags=["Media"])
async def upload_image(file: UploadFile = File(...), _: str = Depends(verify_token)):
    try:
        # Validate Cloudinary config is present
        if not all([CLOUDINARY_CLOUD, CLOUDINARY_KEY, CLOUDINARY_SEC]):
            raise HTTPException(status_code=500, detail="Cloudinary not configured — check env vars")

        contents = await file.read()

        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty")

        # Run sync Cloudinary upload in a thread to avoid blocking the event loop
        import asyncio
        import io
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None,
            lambda: cloudinary.uploader.upload(
                io.BytesIO(contents),
                folder="annika/products",
                resource_type="image",
            )
        )

        return {"url": result["secure_url"]}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Cloudinary upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


# ─── 14. Inquiry Routes ───────────────────────────────────────────────────────
@app.get("/api/inquiries", tags=["Inquiry"])
async def get_inquiries(_: str = Depends(verify_token)):
    cursor = inquiries_col.find().sort("timestamp", -1)
    docs = [serialize(i) async for i in cursor]
    return mongo_response(docs)

@app.patch("/api/inquiries/{inquiry_id}", tags=["Inquiry"])
async def update_inquiry_status(inquiry_id: str, body: InquiryStatusUpdate, _: str = Depends(verify_token)):
    result = await inquiries_col.update_one(
        {"_id": ObjectId(inquiry_id)},
        {"$set": {"status": body.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "updated"}

@app.delete("/api/inquiries/{inquiry_id}", tags=["Inquiry"])
async def delete_inquiry(inquiry_id: str, _: str = Depends(verify_token)):
    result = await inquiries_col.delete_one({"_id": ObjectId(inquiry_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "deleted"}

@app.post("/api/contact", status_code=201, tags=["Inquiry"])
async def submit_contact(inquiry: ContactInquiry, bg: BackgroundTasks):
    doc = inquiry.dict()
    doc["type"] = "contact"
    doc["status"] = "unread"
    doc["timestamp"] = datetime.utcnow()
    await inquiries_col.insert_one(doc)
    fields = {"Name": inquiry.user_name, "Email": inquiry.user_email,
              "Company": inquiry.company or "N/A", "Phone": inquiry.phone or "N/A",
              "Message": inquiry.message}
    html = get_html_template("New Contact Inquiry", fields)
    bg.add_task(send_email, f"[Contact] {inquiry.user_name}", html, inquiry.user_email)
    return {"status": "success"}

@app.post("/api/datasheet", status_code=201, tags=["Inquiry"])
async def request_datasheet(req: DatasheetRequest, bg: BackgroundTasks):
    doc = req.dict()
    doc["type"] = "datasheet"
    doc["status"] = "unread"
    doc["timestamp"] = datetime.utcnow()
    await inquiries_col.insert_one(doc)
    fields = {"Name": req.user_name, "Email": req.user_email, "Product": req.product_title,
              "Company": req.company or "N/A", "Phone": req.phone or "N/A"}
    html = get_html_template("Datasheet Request", fields)
    bg.add_task(send_email, f"[Datasheet] {req.product_title}", html, req.user_email)
    return {"status": "success"}

@app.post("/api/custom-specs", status_code=201, tags=["Inquiry"])
async def submit_custom_specs(inquiry: CustomSpecsInquiry, bg: BackgroundTasks):
    doc = inquiry.dict()
    doc["type"] = "custom_specs"
    doc["status"] = "unread"
    doc["timestamp"] = datetime.utcnow()
    await inquiries_col.insert_one(doc)
    fields = {"Name": inquiry.user_name, "Email": inquiry.user_email,
              "Phone": inquiry.phone or "N/A", "Product Type": inquiry.product_type,
              "Specifications": f"<div style='white-space:pre-wrap'>{inquiry.specs}</div>"}
    html = get_html_template("Custom Specs Inquiry", fields)
    bg.add_task(send_email, f"[Custom Specs] {inquiry.product_type}", html, inquiry.user_email)
    return {"status": "success"}

# ─── 15. Debug Route ──────────────────────────────────────────────────────────
@app.get("/debug-db", tags=["System"])
async def debug_db():
    try:
        await db_.command("ping")
        return {"status": "MongoDB connected"}
    except Exception as e:
        return {"error": str(e)}

# ─── 16. Run ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False,
                proxy_headers=True, forwarded_allow_ips="*")