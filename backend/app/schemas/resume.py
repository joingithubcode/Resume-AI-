from typing import Any

from pydantic import BaseModel, Field


class ResumeCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    template_key: str = Field(default='minimal-ats', min_length=2, max_length=100)
    content: dict[str, Any]


class ResumeUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=200)
    template_key: str | None = Field(default=None, min_length=2, max_length=100)
    content: dict[str, Any] | None = None
    ats_score: int | None = Field(default=None, ge=0, le=100)


class ResumeOut(BaseModel):
    id: int
    user_id: int
    title: str
    template_key: str
    content: dict[str, Any]
    ats_score: int | None

    class Config:
        from_attributes = True
