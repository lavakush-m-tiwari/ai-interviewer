from typing import List

from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    """
    Response model for resume upload.
    """

    session_id: str
    resume_summary: str


class ConversationResponse(BaseModel):
    """
    Response model for conversation.
    """

    session_id: str
    answer: str | None = None
    next_question: str | None = None


class InterviewResultResponse(BaseModel):
    """
    Response model for the end of the interview.
    """
    session_id: str
    score: int
    weaknesses: List[str]
    strengths: List[str]
    feedback: str