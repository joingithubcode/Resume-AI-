from typing import Any

from fastapi import APIRouter

from app.services.ats_service import analyze_resume

router = APIRouter(prefix='/ats', tags=['ATS'])


@router.post('/score')
def ats_score(payload: dict[str, Any]):
    return analyze_resume(payload)
