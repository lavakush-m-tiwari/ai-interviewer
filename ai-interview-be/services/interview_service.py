from uuid import uuid4
from fastapi import HTTPException
from decorators.request_validation import with_session
from schema.response_models import (
    ResumeUploadResponse,
    ConversationResponse,
    InterviewResultResponse,
)
from services.file_service import FileService
from services.langchain_service import LangchainService
from services.session_service import session_service
from typed_dicts.Question import SessionData, Question


class InterviewService:
    def __init__(self):
        self.langchain_service = LangchainService()

    async def create_session_from_resume(
        self, file_bytes: bytes
    ) -> ResumeUploadResponse:
        """
        Create a new interview session from the uploaded resume.
        :param file_bytes: The resume file content.
        :return: A session ID.
        """
        if not file_bytes:
            raise ValueError("No file provided for resume upload.")
        # Extract text from the PDF file
        file_content = FileService.extract_pdf_text(file_bytes)
        resume_summary = self.langchain_service.summarize_resume(file_content)
        session_id = str(uuid4())
        session_data = SessionData(
            resume_summary=resume_summary,
            questions=[],
            current_question_index=0,
        )
        session_service.create_session(session_id=session_id, data=session_data)
        return ResumeUploadResponse(
            session_id=session_id, resume_summary=resume_summary
        )

    @with_session
    async def start_interview(self, session_id: str) -> ConversationResponse:
        """
        Start an interview session.
        :param session_id: The session ID for the interview.
        :return: The first question to ask.
        """
        session_data = session_service.get_session(session_id)
        if session_data["current_question_index"] > 0:
            raise HTTPException(
                status_code=400, detail="Interview session already started."
            )

        q = self.langchain_service.generate_question(session_data["resume_summary"])
        session_data["questions"].append(Question(q=q, a=None, feedback=None))
        session_data["current_question_index"] = 1
        session_service.update_session(session_id, session_data)
        return ConversationResponse(session_id=session_id, next_question=q)

    @with_session
    async def answer_question(
        self, session_id: str, answer: str
    ) -> ConversationResponse | InterviewResultResponse:
        """
        Answer a question in the interview.
        :param session_id: The session ID for the interview.
        :param answer: The answer provided by the candidate.
        :return: The next question to ask or the end of the interview.
        """
        session_data = session_service.get_session(session_id)
        current_index = session_data["current_question_index"] - 1

        if current_index < 0 or current_index >= len(session_data["questions"]):
            raise HTTPException(status_code=400, detail="No active question to answer.")

        question = session_data["questions"][current_index]["q"]
        response = self.langchain_service.process_answer(question, answer)
        response_data = response.split("Follow-up Question:")
        feedback = response_data[0].strip()
        next_question = response_data[1].strip() if len(response_data) > 1 else None
        session_data["questions"][current_index]["a"] = answer
        session_data["questions"][current_index]["feedback"] = feedback

        if session_data["current_question_index"] >= 10:
           return await self.end_interview(session_id)

        session_data["questions"].append(
            {"q": next_question, "a": None, "feedback": None}
        )
        session_service.update_session(session_id, session_data)
        return ConversationResponse(session_id=session_id, next_question=next_question)

    @with_session
    async def end_interview(self, session_id: str) -> InterviewResultResponse:
        """
        End the interview session.
        :param session_id: The session ID for the interview.
        :return: A response indicating the interview has ended.
        """
        session_data = session_service.get_session(session_id)
        qna_text = ""
        for question in session_data["questions"]:
            qna_text += f"\nQ: {question['q']}\nA: {question['a'] or 'No answer provided'}"
        response = await self.langchain_service.generate_feedback(qna_text)


        return InterviewResultResponse(
            session_id=session_id,
            weaknesses=response.get("weaknesses", []),
            strengths=response.get("strengths", []),
            score=response.get("score", 0),
            feedback=response.get("feedback", "No feedback provided"),
        )  # Score can be calculated based on the answers and feedback if needed
