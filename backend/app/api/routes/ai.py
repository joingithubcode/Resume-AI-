from typing import Any

from fastapi import APIRouter

from app.services.ai_service import generate_suggestions
from app.services.job_prediction import predict_roles

router = APIRouter(prefix='/ai', tags=['AI'])


@router.post('/suggest')
def suggest(payload: dict[str, Any]):
    return generate_suggestions(payload)


@router.post('/predict-jobs')
def predict_jobs(payload: dict[str, Any]):
    return predict_roles(payload)
