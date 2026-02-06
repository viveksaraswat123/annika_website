from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Dict

app = FastAPI(title="Annika Technologies API")

# Enable CORS so your React frontend can talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class ContactInquiry(BaseModel):
    user_name: str
    user_email: EmailStr
    message: str

# Product Database (Mapped from PDF)
PRODUCTS_DB = [
    {
        "id": 1,
        "category": "PCB Assembly",
        "title": "PCB Card Assembly",
        "desc": "High-precision single-sided and sub-assembly solutions.",
        "specs": {"Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron"}
    },
    {
        "id": 2,
        "category": "Indicators",
        "title": "Neon Indicator Lamps",
        "desc": "Industrial signaling with 25,000-hour lifespan.",
        "specs": {"Life": "25000 Hrs", "Length": "5 Inch", "Rating": "25 Amps"}
    },
    {
        "id": 3,
        "category": "Wire Harness",
        "title": "Electronics Wire Harness",
        "desc": "Custom PVC insulated copper wire harnesses.",
        "specs": {"Material": "Pure Copper", "Jacket": "PVC", "Rating": "High Temp"}
    }
]

@app.get("/api/products")
async def get_products():
    return PRODUCTS_DB

@app.post("/api/contact")
async def submit_contact(inquiry: ContactInquiry):
    # Here you would typically send an email or save to a database
    print(f"New Inquiry from {inquiry.user_name}: {inquiry.message}")
    return {"status": "success", "message": "Inquiry received successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)