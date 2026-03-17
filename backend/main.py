import os
import sys
import logging
import smtplib
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# ─── 0. Load .env ─────────────────────────────────────────────────────────────
load_dotenv()

# ─── 1. Logging ──────────────────────────────────────────────────────────────
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=getattr(logging, LOG_LEVEL, logging.INFO))
logger = logging.getLogger(__name__)

# ─── 2. Email Config ─────────────────────────────────────────────────────────
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
SALES_EMAIL = os.getenv("SALES_EMAIL")

missing_envs = [var for var in ["SMTP_USER", "SMTP_PASS", "SALES_EMAIL"] if not os.getenv(var)]
if missing_envs:
    logger.critical(f"Missing environment variables: {', '.join(missing_envs)}. Exiting...")
    sys.exit(1)

# ─── 3. FastAPI App Init ─────────────────────────────────────────────────────
app = FastAPI(
    title="Annika Technologies Enterprise API",
    description="Production API for Manufacturing & Inquiry Management",
    version="1.0.0",
    redirect_slashes=False,
)

# ─── 4. CORS Middleware ──────────────────────────────────────────────────────
origins = [
    "https://annika-technologies.com",
    "https://www.annika-technologies.com",
    "https://annika-website.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── 5. Helpers & Email Logic ────────────────────────────────────────────────
def get_html_template(title: str, fields: dict) -> str:
    """Generates a professional, branded HTML email body."""
    rows = "".join([
        f"<tr><td style='padding: 10px; border-bottom: 1px solid #eee; width: 150px;'><b>{k}:</b></td>"
        f"<td style='padding: 10px; border-bottom: 1px solid #eee;'>{v}</td></tr>" 
        for k, v in fields.items()
    ])
    
    return f"""
    <html>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="background-color: #1a3a5a; color: #ffffff; padding: 25px; text-align: center;">
                    <h2 style="margin: 0; letter-spacing: 1px;">{title}</h2>
                </div>
                <div style="padding: 30px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        {rows}
                    </table>
                </div>
                <div style="background-color: #f8f9fa; color: #666; padding: 15px; text-align: center; font-size: 12px; border-top: 1px solid #eee;">
                    © {datetime.utcnow().year} Annika Technologies | Automated System Notification
                </div>
            </div>
        </body>
    </html>
    """

def send_email(subject: str, html_body: str, reply_to: str = "") -> bool:
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Annika Technologies <{SALES_EMAIL}>"
        msg["To"] = SALES_EMAIL

        if reply_to:
            msg["Reply-To"] = reply_to

        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP("smtp.hostinger.com", 587) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SALES_EMAIL, SALES_EMAIL, msg.as_string())

        logger.info(f"Email sent successfully | Subject: {subject}")
        return True
    except Exception as e:
        logger.error(f"Email send failed: {str(e)}")
        return False

# ─── 6. Data Models ─────────────────────────────────────────────────────────
class Product(BaseModel):
    id: int
    category: str
    title: str
    desc: str
    specs: dict
    in_stock: bool = True

class ContactInquiry(BaseModel):
    user_name: str = Field(..., min_length=2, max_length=50)
    user_email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=10, max_length=1000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class DatasheetRequest(BaseModel):
    user_name: str = Field(..., min_length=2, max_length=50)
    user_email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    product_title: str = Field(..., max_length=100)
    message: Optional[str] = Field(None, max_length=1000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CustomSpecsInquiry(BaseModel):
    user_name: str = Field(..., min_length=2, max_length=50)
    user_email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    product_type: str = Field(..., max_length=50)
    specs: str = Field(..., min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# ─── 7. Mock Database ───────────────────────────────────────────────────────
PRODUCTS_DB = [
    {
        "id": 1,
        "category": "PCB Assembly",
        "title": "PCB Card Assembly",
        "desc": "High-precision single-sided assemblies with 35-micron copper and HASL finishing.",
        "specs": {"Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron", "Origin": "India"},
        "in_stock": True,
    },
    {
        "id": 2,
        "category": "Wire Harness",
        "title": "Electronics Wire Harness",
        "desc": "Customized PVC insulated copper wire harnesses for heavy-duty industrial machinery.",
        "specs": {"Pins": "2-12 Pin", "Material": "Pure Copper", "Jacket": "PVC", "Rating": "High Temp"},
        "in_stock": True,
    },
    {
        "id": 3,
        "category": "Indicators",
        "title": "Neon Indicator Lamps",
        "desc": "Extended-life signaling modules rated for 135°C continuous operation.",
        "specs": {"Life": "25,000 Hrs", "Current": "25 Amps", "Temp": "135°C", "Type": "Industrial"},
        "in_stock": True,
    },
]

# ─── 8. System APIs ─────────────────────────────────────────────────────────
@app.get("/", tags=["System"])
@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "running", "timestamp": datetime.utcnow()}

# ─── 9. Product APIs ───────────────────────────────────────────────────────
@app.get("/api/products", response_model=List[Product], tags=["Catalog"])
async def get_products(category: Optional[str] = None):
    data = PRODUCTS_DB
    if category:
        data = [p for p in data if p["category"].lower() == category.lower()]
    return data

@app.get("/api/products/{product_id}", response_model=Product, tags=["Catalog"])
async def get_product(product_id: int):
    product = next((p for p in PRODUCTS_DB if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# ─── 10. Inquiry APIs (Refactored) ──────────────────────────────────────────
@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_contact(inquiry: ContactInquiry, background_tasks: BackgroundTasks):
    fields = {
        "Name": inquiry.user_name,
        "Email": inquiry.user_email,
        "Company": inquiry.company or "N/A",
        "Phone": inquiry.phone or "N/A",
        "Message": inquiry.message
    }
    html_content = get_html_template("New Contact Inquiry", fields)
    background_tasks.add_task(send_email, f"[Contact] {inquiry.user_name}", html_content, inquiry.user_email)
    return {"status": "success", "message": "Contact request received"}

@app.post("/api/datasheet", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def request_datasheet(request: DatasheetRequest, background_tasks: BackgroundTasks):
    fields = {
        "Name": request.user_name,
        "Email": request.user_email,
        "Product": request.product_title,
        "Company": request.company or "N/A",
        "Phone": request.phone or "N/A"
    }
    html_content = get_html_template("Datasheet Request", fields)
    background_tasks.add_task(send_email, f"[Datasheet] {request.product_title}", html_content, request.user_email)
    return {"status": "success", "message": "Datasheet request received"}

@app.post("/api/custom-specs", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_custom_specs(inquiry: CustomSpecsInquiry, background_tasks: BackgroundTasks):
    fields = {
        "Name": inquiry.user_name,
        "Email": inquiry.user_email,
        "Phone": inquiry.phone or "N/A",
        "Product Type": inquiry.product_type,
        "Specifications": f"<div style='white-space: pre-wrap;'>{inquiry.specs}</div>"
    }
    html_content = get_html_template("Custom Specs Inquiry", fields)
    background_tasks.add_task(send_email, f"[Custom Specs] {inquiry.product_type}", html_content, inquiry.user_email)
    return {"status": "success", "message": "Specification inquiry received"}

# ─── 11. Run Server ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False, proxy_headers=True, forwarded_allow_ips="*")