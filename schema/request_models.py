from pydantic import BaseModel


class AnswerRequest(BaseModel):
    """
    Request model for answering a question in the interview.
    """

    session_id: str
    answer: str
