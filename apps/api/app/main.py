import logging
import time
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("baa-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="HIPAA BAA Templates API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/templates")
def get_templates():
    return [
        {"id": "std-hosp", "name": "Standard Hospital BAA", "version": "2025.1", "tier": "All"},
        {"id": "cloud-ba", "name": "Cloud Provider BAA", "version": "2024.4", "tier": "High"},
        {"id": "saas-min", "name": "SaaS Minimal BAA", "version": "2025.1", "tier": "Low"}
    ]

@app.get("/risk/summary")
def get_risk_summary():
    return {
        "high_risk_vendors": 12,
        "unsigned_baas": 3,
        "overdue_renewals": 8,
        "compliance_coverage": 0.98
    }

@app.get("/renewals/status")
def get_renewals_status():
    return [
        {"vendor": "CloudHealth AI", "expiry": "2026-06-15", "status": "In Progress"},
        {"vendor": "MedBill Pro", "expiry": "2026-05-01", "status": "Urgent"},
        {"vendor": "SecureDocs", "expiry": "2026-12-20", "status": "Stable"}
    ]

@app.get("/scores/summary")
def get_scores_summary():
    return {
        "overall_maturity": 0.85,
        "legal_velocity": 0.72,
        "audit_readiness": 0.95,
        "vendor_transparency": 0.80
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_active_baas": 450,
        "pending_signatures": 5,
        "active_negotiations": 14,
        "last_audit_completion": "2026-03-10"
    }
