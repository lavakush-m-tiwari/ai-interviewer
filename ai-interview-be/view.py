from fastapi import APIRouter, UploadFile, File
from fastapi.params import Depends

from schema.request_models import AnswerRequest
from schema.response_models import (
    ResumeUploadResponse,
    ConversationResponse,
    InterviewResultResponse,
)
from services.interview_service import InterviewService

router = APIRouter()

sessions = {}


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    interview_service: InterviewService = Depends(InterviewService),
) -> ResumeUploadResponse:
    """
    Upload a resume file.
    :param interview_service:
    :param file: The resume file to upload.
    :return: session ID.
    """
    content = await file.read()
    return await interview_service.create_session_from_resume(file_bytes=content)


@router.post("/start-interview")
async def start_interview(
    session_id: str, interview_service: InterviewService = Depends(InterviewService)
) -> ConversationResponse:
    """
    Start an interview session.
    :param session_id: The session ID for the interview.
    :param interview_service: The interview service instance.
    :return: The first question to ask.
    """
    print("session id", session_id)
    return await interview_service.start_interview(session_id=session_id)


@router.post("/answer-question")
async def answer_question(
    request: AnswerRequest,
    interview_service: InterviewService = Depends(InterviewService),
) -> ConversationResponse:
    """
    Answer a question in the interview.
    :param request: The request containing session ID and answer.
    :param interview_service: The interview service instance.
    :return: The next question to ask.
    """
    return await interview_service.answer_question(
        session_id=request.session_id, answer=request.answer
    )


@router.get("/end-interview")
async def end_interview(
    session_id: str, interview_service: InterviewService = Depends(InterviewService)
) -> InterviewResultResponse:
    """
    End the interview session.
    :param session_id: The session ID for the interview.
    :param interview_service: The interview service instance.
    :return: A response indicating the interview has ended.
    """
    return await interview_service.end_interview(session_id=session_id)
