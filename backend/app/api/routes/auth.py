from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.user import User
from app.schemas.auth import TokenResponse, UserLogin, UserProfile, UserSignup

router = APIRouter(prefix='/auth', tags=['Auth'])


def get_current_user(token: str, db: Session) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        subject = payload.get('sub')
        if subject is None:
            raise credentials_exception
    except JWTError as exc:
        raise credentials_exception from exc

    user = db.query(User).filter(User.email == subject).first()
    if not user:
        raise credentials_exception
    return user


@router.post('/signup', response_model=UserProfile)
def signup(payload: UserSignup, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')

    user = User(
        full_name=payload.full_name,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post('/login', response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail='Invalid credentials')

    token = create_access_token(subject=user.email)
    return TokenResponse(access_token=token)


@router.post('/google', response_model=TokenResponse)
def google_login():
    token = create_access_token(subject='google_user@example.com')
    return TokenResponse(access_token=token)


@router.post('/forgot-password')
def forgot_password(email: str):
    return {'message': f'Password reset link sent to {email} (stub).'}


@router.post('/verify-email')
def verify_email(token: str):
    return {'message': f'Email verification completed for token {token[:8]}*** (stub).'}
