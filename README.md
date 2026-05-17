# ResumeAI Pro

Modern full-stack AI Resume Builder using **React + FastAPI + PostgreSQL**.

## Features Implemented (MVP)
- Modern SaaS-style landing page and app shell
- Light/Dark mode
- Auth screens with JWT backend flow
- Dashboard with analytics cards, ATS chart, activity timeline
- Multi-step resume builder
- Drag-and-drop section ordering
- 10 premium template options
- Real-time resume preview
- AI suggestions + ATS scoring + job prediction API integration
- Resume persistence API (CRUD)
- Export API stubs for PDF/DOCX integration
- Docker Compose for local full-stack startup

## Project Structure
- `/frontend` React, Tailwind CSS, Framer Motion, Redux Toolkit
- `/backend` FastAPI REST API with JWT-ready auth and PostgreSQL models
- `/docker-compose.yml` Local orchestration for frontend, backend, and DB

## Quick Start
### 1) Backend
```bash
cd /home/runner/work/Resume-AI-/Resume-AI-/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### 2) Frontend
```bash
cd /home/runner/work/Resume-AI-/Resume-AI-/frontend
npm install
npm run dev
```

### 3) Docker (optional)
```bash
cd /home/runner/work/Resume-AI-/Resume-AI-
docker compose up --build
```

## API Overview
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/google`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/verify-email`
- `GET/POST/PUT/DELETE /api/v1/resumes`
- `POST /api/v1/ats/score`
- `POST /api/v1/ai/suggest`
- `POST /api/v1/ai/predict-jobs`
- `GET /api/v1/dashboard/analytics`

## Notes
This is a production-style starter architecture. For full SaaS release, next steps include robust RBAC, email workflows, OAuth callback verification, async job queue, real PDF/DOCX rendering, and full ATS NLP pipeline.
