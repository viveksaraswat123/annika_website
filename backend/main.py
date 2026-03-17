import os
from dotenv import load_dotenv


import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import sys

# Load .env file
load_dotenv()
# ─── 1. LOGGING ───────────────────────────────────────────────────────────────
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=getattr(logging, LOG_LEVEL, logging.INFO))
logger = logging.getLogger(__name__)

# ─── 2. EMAIL CONFIG ─────────────────────────────────────────────────────────
SMTP_USER   = os.getenv("SMTP_USER")
SMTP_PASS   = os.getenv("SMTP_PASS")
SALES_EMAIL = os.getenv("SALES_EMAIL")

missing_envs = []
if not SMTP_USER:   missing_envs.append("SMTP_USER")
if not SMTP_PASS:   missing_envs.append("SMTP_PASS")
if not SALES_EMAIL: missing_envs.append("SALES_EMAIL")

if missing_envs:
    logger.critical(f"Missing environment variables: {', '.join(missing_envs)}. Exiting...")
    sys.exit(1)

# ─── 3. APP INIT ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Annika Technologies Enterprise API",
    description="Production API for Manufacturing & Inquiry Management",
    version="1.0.0",
    redirect_slashes=False,
)

# ─── 4. CORS ──────────────────────────────────────────────────────────────────
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

# ─── 5. SEND EMAIL FUNCTION ───────────────────────────────────────────────────
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
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SALES_EMAIL, SALES_EMAIL, msg.as_string())

        logger.info(f"Email sent to {SALES_EMAIL} | Subject: {subject}")
        return True

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP Authentication failed — check username/password or alias verification")
        return False
    except Exception as e:
        logger.error(f"Email send failed: {str(e)}")
        return False

# ─── 6. DATA MODELS ───────────────────────────────────────────────────────────
class Product(BaseModel):
    id: int
    category: str
    title: str
    desc: str
    specs: dict
    in_stock: bool = True

class ContactInquiry(BaseModel):
    user_name:  str = Field(..., min_length=2, max_length=50)
    user_email: EmailStr
    company:    Optional[str] = Field(None, max_length=100)
    phone:      Optional[str] = Field(None, max_length=20)
    message:    str = Field(..., min_length=10, max_length=1000)
    timestamp:  datetime = Field(default_factory=datetime.utcnow)

class DatasheetRequest(BaseModel):
    user_name:    str = Field(..., min_length=2, max_length=50)
    user_email:   EmailStr
    company:      Optional[str] = Field(None, max_length=100)
    phone:        Optional[str] = Field(None, max_length=20)
    product_title: str = Field(..., max_length=100)
    message:      Optional[str] = Field(None, max_length=1000)
    timestamp:    datetime = Field(default_factory=datetime.utcnow)

class CustomSpecsInquiry(BaseModel):
    user_name:    str = Field(..., min_length=2, max_length=50)
    user_email:   EmailStr
    phone:        Optional[str] = Field(None, max_length=20)
    product_type: str = Field(..., max_length=50)
    specs:        str = Field(..., min_length=10, max_length=2000)
    timestamp:    datetime = Field(default_factory=datetime.utcnow)

# ─── 7. MOCK DATABASE ─────────────────────────────────────────────────────────
PRODUCTS_DB = [
    {"id": 1, "category": "PCB Assembly", "title": "PCB Card Assembly",
     "desc": "High-precision single-sided assemblies with 35-micron copper and HASL finishing.",
     "specs": {"Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron", "Origin": "India"}, "in_stock": True},
    {"id": 2, "category": "Wire Harness", "title": "Electronics Wire Harness",
     "desc": "Customized PVC insulated copper wire harnesses for heavy-duty industrial machinery.",
     "specs": {"Pins": "2-12 Pin", "Material": "Pure Copper", "Jacket": "PVC", "Rating": "High Temp"}, "in_stock": True},
    {"id": 3, "category": "Indicators", "title": "Neon Indicator Lamps",
     "desc": "Extended-life signaling modules rated for 135°C continuous operation.",
     "specs": {"Life": "25,000 Hrs", "Current": "25 Amps", "Temp": "135°C", "Type": "Industrial"}, "in_stock": True},
    {"id": 4, "category": "Indicators", "title": "LED Neon Indicator",
     "desc": "High-visibility control panel indicators with universal mounting.",
     "specs": {"Voltage": "24V DC", "Mounting": "22.5 mm", "Body": "Plastic", "Wattage": "12-24V"}, "in_stock": True},
    {"id": 5, "category": "PCB Assembly", "title": "Electronic Sub Assembly",
     "desc": "Integrated board builds for complex electronic products, rated 20A.",
     "specs": {"Current": "20A", "Stability": "High", "Usage": "OEM", "Package": "Packet"}, "in_stock": True},
]

# ─── 8. EMAIL TEMPLATES ───────────────────────────────────────────────────────
def _base_template(title: str, badge: str, badge_color: str, rows: list[tuple]) -> str:
    rows_html = "".join(
        f"""<tr>
              <td style="padding:10px 16px;color:#64748b;font-size:13px;width:140px;vertical-align:top">{k}</td>
              <td style="padding:10px 16px;color:#0f172a;font-size:13px;font-weight:600">{v}</td>
            </tr>"""
        for k, v in rows
    )
    return f"""
    <!DOCTYPE html><html><body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:40px 20px">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <tr><td style="background:#0f172a;padding:32px 40px">
            <p style="margin:0 0 6px;color:#22d3ee;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase">Annika Technologies</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.02em">{title}</h1>
          </td></tr>
          <tr><td style="padding:24px 40px 0">
            <span style="display:inline-block;background:{badge_color};color:#0f172a;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:5px 14px;border-radius:6px">{badge}</span>
          </td></tr>
          <tr><td style="padding:16px 24px 8px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
              {rows_html}
            </table>
          </td></tr>
          <tr><td style="padding:24px 40px 32px;border-top:1px solid #f1f5f9;margin-top:16px">
            <p style="margin:0;color:#94a3b8;font-size:11px">
              Received at {datetime.utcnow().strftime("%d %b %Y, %H:%M UTC")} &nbsp;·&nbsp; Annika Technologies Production API
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    </body></html>
    """

def contact_email_html(data: ContactInquiry) -> str:
    rows = [
        ("Name", data.user_name),
        ("Email", f'<a href="mailto:{data.user_email}" style="color:#0891b2">{data.user_email}</a>'),
        ("Company", data.company or "—"),
        ("Phone", data.phone or "—"),
        ("Message", data.message),
    ]
    return _base_template("New Contact Inquiry", "Contact Form", "#cffafe", rows)

def datasheet_email_html(data: DatasheetRequest) -> str:
    rows = [
        ("Name", data.user_name),
        ("Email", f'<a href="mailto:{data.user_email}" style="color:#0891b2">{data.user_email}</a>'),
        ("Company", data.company or "—"),
        ("Phone", data.phone or "—"),
        ("Product", f"<strong>{data.product_title}</strong>"),
        ("Notes", data.message or "—"),
    ]
    return _base_template("Datasheet Request", "Datasheet", "#d1fae5", rows)

def custom_specs_email_html(data: CustomSpecsInquiry) -> str:
    rows = [
        ("Name", data.user_name),
        ("Email", f'<a href="mailto:{data.user_email}" style="color:#0891b2">{data.user_email}</a>'),
        ("Phone", data.phone or "—"),
        ("Product Type", data.product_type),
        ("Specs", f"<pre style='margin:0;white-space:pre-wrap;font-size:12px'>{data.specs}</pre>"),
    ]
    return _base_template("Custom Specs Enquiry", "OEM / Custom", "#fef9c3", rows)

# ─── 9. ENDPOINTS ─────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

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

@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_contact(inquiry: ContactInquiry):
    logger.info(f"[CONTACT] {inquiry.user_name} <{inquiry.user_email}>")
    sent = send_email(
        subject=f"[Contact] New inquiry from {inquiry.user_name}",
        html_body=contact_email_html(inquiry),
        reply_to=inquiry.user_email,
    )
    return {"status": "success", "message": "Thank you. Our technical team will contact you shortly.", "email_sent": sent}

@app.post("/api/datasheet", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def request_datasheet(request: DatasheetRequest):
    logger.info(f"[DATASHEET] {request.product_title} requested by {request.user_email}")
    sent = send_email(
        subject=f"[Datasheet] {request.product_title} — {request.user_name}",
        html_body=datasheet_email_html(request),
        reply_to=request.user_email,
    )
    return {"status": "success", "message": "Datasheet request received. We will send it within 24 hours.", "email_sent": sent}

@app.post("/api/custom-specs", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_custom_specs(inquiry: CustomSpecsInquiry):
    logger.info(f"[CUSTOM SPECS] {inquiry.product_type} from {inquiry.user_email}")
    sent = send_email(
        subject=f"[Custom Specs] {inquiry.product_type} — {inquiry.user_name}",
        html_body=custom_specs_email_html(inquiry),
        reply_to=inquiry.user_email,
    )
    return {"status": "success", "message": "Enquiry received. An engineer will reach out within 1 business day.", "email_sent": sent}

# ─── 10. RUNNER ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False, proxy_headers=True, forwarded_allow_ips="*")