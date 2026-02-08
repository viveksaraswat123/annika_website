import os
import logging
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# 1. SETUP LOGGING
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Annika Technologies Enterprise API",
    description="Production API for Manufacturing & Inquiry Management",
    version="1.0.0",
    redirect_slashes=False,
)

# 2. DYNAMIC CORS CONFIGURATION
# In your FastAPI main.py
origins = [
    "https://annika-technologies.com",
    "https://www.annika-technologies.com",
    "https://annika-website.vercel.app", # Your Vercel preview URL
    "http://localhost:5173",            # For local testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # This tells Railway to accept requests from these sites
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ROBUST DATA MODELS
class ProductSpec(BaseModel):
    key: str
    value: str

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
    message: str = Field(..., min_length=10, max_length=1000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# 4. DATA LAYER (MOCKING A DATABASE)
PRODUCTS_DB = [
    {
        "id": 1,
        "category": "PCB Assembly",
        "title": "Industrial PCB Card Assembly",
        "desc": "High-precision sub-assembly with HASL finish and 35-micron copper.",
        "specs": {"Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron"}
    },
    {
        "id": 2,
        "category": "Indicators",
        "title": "Neon Indicator Lamps",
        "desc": "Industrial signaling with 25,000-hour lifespan and high-temp stability.",
        "specs": {"Life": "25000 Hrs", "Rating": "25 Amps", "Temp": "135°C"}
    }
]

# 5. API ENDPOINTS
@app.get("/health", tags=["System"])
async def health_check():
    """Used by Railway/Vercel to verify the server is alive."""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.get("/api/products", response_model=List[Product], tags=["Catalog"])
async def get_products():
    return PRODUCTS_DB

@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Inquiry"])
async def submit_contact(inquiry: ContactInquiry):
    try:
        # LOGGING INSTEAD OF PRINTING
        logger.info(f"Inquiry received from {inquiry.user_email}")
        
        # PRODUCTION LOGIC: 
        # Here you would add:
        # 1. await db.inquiries.insert_one(inquiry.dict())
        # 2. await send_email_notification(inquiry)
        
        return {
            "status": "success", 
            "message": "Thank you. Our technical team will contact you shortly."
        }
    except Exception as e:
        logger.error(f"Contact submission failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not process inquiry at this time."
        )

# 6. RUNNER (Optimized for Railway)
if __name__ == "__main__":
    import uvicorn
    # Use environment variable for port to match Railway's injection
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=port,
    reload=False,
    proxy_headers=True,
    forwarded_allow_ips="*",
)
