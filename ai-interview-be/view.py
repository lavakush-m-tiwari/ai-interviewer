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
    # return ResumeUploadResponse(session_id='5', resume_summary='summary')  # Mock response for testing purposes


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
    return await interview_service.start_interview(session_id=session_id)
    # return ConversationResponse(
    #     session_id=session_id,
    #     next_question="What is your experience with Python?",
    # )



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

    # return ConversationResponse(
    #     session_id='5',
    #     next_question="What is your experience with Python?",
    # )


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
    # return InterviewResultResponse(
    #     session_id=session_id,
    #     score=85,
    #     weaknesses=["Time management", "Communication skills"],
    #     strengths=["Problem-solving", "Technical knowledge"],
    #     feedback="Overall good performance, but needs improvement in time management.",
    # )
    return await interview_service.end_interview(session_id=session_id)
