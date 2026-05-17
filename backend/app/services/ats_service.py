from typing import Any


def analyze_resume(content: dict[str, Any]) -> dict[str, Any]:
    text_blob = ' '.join(str(v) for v in content.values()).lower()
    keywords = ['python', 'react', 'leadership', 'communication', 'sql', 'api', 'cloud']
    matches = [k for k in keywords if k in text_blob]
    score = min(100, 45 + len(matches) * 8)

    missing = [k for k in keywords if k not in matches][:4]
    suggestions = [
        'Quantify achievements with metrics.',
        'Use stronger action verbs in bullet points.',
        'Align keywords with target job description.',
    ]
    if missing:
        suggestions.append(f"Consider adding ATS keywords: {', '.join(missing)}")

    return {
        'score': score,
        'matched_keywords': matches,
        'missing_keywords': missing,
        'suggestions': suggestions,
    }
