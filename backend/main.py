import os
import sys
import logging
import smtplib
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
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

# ─── 5. Email Sending Function ───────────────────────────────────────────────
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

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP Authentication failed — check username/password")
        return False

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

# ─── 8. Health Check ───────────────────────────────────────────────────────
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


# ─── 10. Inquiry APIs ───────────────────────────────────────────────────────
@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_contact(inquiry: ContactInquiry):
    sent = send_email(
        subject=f"[Contact] {inquiry.user_name}",
        html_body=f"""
        <b>Name:</b> {inquiry.user_name}<br>
        <b>Email:</b> {inquiry.user_email}<br>
        <b>Message:</b> {inquiry.message}
        """,
        reply_to=inquiry.user_email,
    )
    return {"status": "success", "email_sent": sent}


@app.post("/api/datasheet", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def request_datasheet(request: DatasheetRequest):
    sent = send_email(
        subject=f"[Datasheet] {request.product_title}",
        html_body=f"""
        <b>Name:</b> {request.user_name}<br>
        <b>Email:</b> {request.user_email}<br>
        <b>Product:</b> {request.product_title}
        """,
        reply_to=request.user_email,
    )
    return {"status": "success", "email_sent": sent}


@app.post("/api/custom-specs", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_custom_specs(inquiry: CustomSpecsInquiry):
    sent = send_email(
        subject=f"[Custom Specs] {inquiry.product_type}",
        html_body=f"""
        <b>Name:</b> {inquiry.user_name}<br>
        <b>Email:</b> {inquiry.user_email}<br>
        <b>Specs:</b> {inquiry.specs}
        """,
        reply_to=inquiry.user_email,
    )
    return {"status": "success", "email_sent": sent}


# ─── 11. Run Server ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        proxy_headers=True,
        forwarded_allow_ips="*",
    )