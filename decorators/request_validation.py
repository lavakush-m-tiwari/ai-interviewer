from functools import wraps
from fastapi import HTTPException
from services.session_service import session_service


def with_session(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        session_id = kwargs.get("session_id")
        if not session_service.is_valid_session(session_id):
            raise HTTPException(
                status_code=404, detail="Session ID is invalid or does not exist."
            )
        return await func(*args, **kwargs)

    return wrapper
