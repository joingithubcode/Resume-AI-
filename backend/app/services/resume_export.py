from fastapi import HTTPException


def export_stub(file_type: str) -> dict[str, str]:
    if file_type not in {'pdf', 'docx'}:
        raise HTTPException(status_code=400, detail='Unsupported export format')
    return {'message': f'{file_type.upper()} export endpoint ready for renderer integration.'}
