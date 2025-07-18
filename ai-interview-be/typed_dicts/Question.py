from typing_extensions import TypedDict


class Question(TypedDict):
    """
    Represents a question in the interview process.
    """

    q: str  # The question text
    a: str | None  # The answer provided by the candidate, if any
    feedback: str | None  # Feedback on the answer, if provided

class SessionData(TypedDict):
    """
    Represents the data stored in a session.
    """

    resume_summary: str  # Summary of the resume
    questions: list[Question] = []  # List of questions asked during the interview
    current_question_index: int  # Index of the current question being asked