from fastapi import APIRouter

router = APIRouter(prefix='/dashboard', tags=['Dashboard'])


@router.get('/analytics')
def analytics():
    return {
        'total_resumes': 8,
        'avg_ats_score': 84,
        'downloads': 23,
        'improvement_rate': 17,
        'ats_history': [68, 72, 76, 81, 85, 88],
        'activity': [
            'Generated AI summary for Product Resume',
            'Improved ATS score from 78 to 86',
            'Downloaded Corporate template as PDF',
        ],
    }
