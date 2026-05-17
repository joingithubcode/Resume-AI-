from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.api.routes.auth import get_current_user
from app.core.database import get_db
from app.models.resume import Resume
from app.schemas.resume import ResumeCreate, ResumeOut, ResumeUpdate
from app.services.resume_export import export_stub

router = APIRouter(prefix='/resumes', tags=['Resumes'])


def _current_user_from_header(authorization: str | None, db: Session):
    if not authorization or not authorization.lower().startswith('bearer '):
        raise HTTPException(status_code=401, detail='Missing Bearer token')
    token = authorization.split(' ', 1)[1]
    return get_current_user(token=token, db=db)


@router.get('/', response_model=list[ResumeOut])
def list_resumes(authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    user = _current_user_from_header(authorization, db)
    return db.query(Resume).filter(Resume.user_id == user.id).all()


@router.post('/', response_model=ResumeOut)
def create_resume(payload: ResumeCreate, authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    user = _current_user_from_header(authorization, db)
    resume = Resume(user_id=user.id, **payload.model_dump())
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume


@router.put('/{resume_id}', response_model=ResumeOut)
def update_resume(resume_id: int, payload: ResumeUpdate, authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    user = _current_user_from_header(authorization, db)
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail='Resume not found')

    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(resume, key, value)

    db.commit()
    db.refresh(resume)
    return resume


@router.delete('/{resume_id}')
def delete_resume(resume_id: int, authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    user = _current_user_from_header(authorization, db)
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail='Resume not found')
    db.delete(resume)
    db.commit()
    return {'message': 'Resume deleted'}


@router.post('/{resume_id}/export/{file_type}')
def export_resume(resume_id: int, file_type: str):
    _ = resume_id
    return export_stub(file_type)
