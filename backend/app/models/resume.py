from sqlalchemy import Column, DateTime, ForeignKey, Integer, JSON, String, func

from app.core.database import Base


class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    template_key = Column(String(100), nullable=False, default='minimal-ats')
    content = Column(JSON, nullable=False)
    ats_score = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
