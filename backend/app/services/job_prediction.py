from typing import Any


def predict_roles(content: dict[str, Any]) -> dict[str, Any]:
    text = ' '.join(str(v).lower() for v in content.values())

    recommendations = []
    if 'react' in text or 'javascript' in text:
        recommendations.append('Frontend Developer')
    if 'python' in text or 'api' in text:
        recommendations.append('Backend Engineer')
    if 'data' in text or 'sql' in text:
        recommendations.append('Data Analyst')
    if not recommendations:
        recommendations = ['Operations Specialist', 'Business Analyst']

    return {'predicted_roles': recommendations[:3]}
