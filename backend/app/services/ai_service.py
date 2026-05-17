from typing import Any


def generate_suggestions(content: dict[str, Any]) -> dict[str, Any]:
    name = content.get('fullName') or 'Candidate'
    target = content.get('targetRole') or 'Software Professional'

    summary = (
        f'{name} is a results-driven {target} with proven ability to deliver measurable outcomes, '
        'collaborate across teams, and adapt quickly to high-impact initiatives.'
    )
    skills = ['Problem Solving', 'Cross-functional Collaboration', 'Data Analysis', 'Agile Delivery']
    bullets = [
        'Led project delivery that improved process efficiency by 28% through automation.',
        'Collaborated with stakeholders to launch features that increased user retention by 14%.',
        'Designed and optimized workflows to reduce turnaround time by 22%.',
    ]

    return {
        'summary': summary,
        'skills': skills,
        'experience_bullets': bullets,
        'grammar_feedback': ['Keep bullet tense consistent.', 'Use 1-2 lines per bullet for readability.'],
    }
