import json

from langchain.chains.llm import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import PromptTemplate
import re

from settings import OPENAI_API_KEY


class LangchainService:
    """
    Langchain service class for handling Langchain-related operations.
    """

    def __init__(self):
        """
        Initializes the Langchain service.
        """
        self.llm = ChatOpenAI(
            model="gpt-4o-mini", temperature=0.7, api_key=OPENAI_API_KEY
        )

    def summarize_resume(self, text: str) -> str:
        """
        Summarizes the given text using the LLM.
        :param text: The text to summarize.
        :return: The summarized text.
        """
        messages = [
            SystemMessage(
                content="You are a helpful assistant."
            ),  # System message to set the context
            HumanMessage(content=f"Please summarize the following text:\n{text}"),
            # User message with the text to summarize
        ]
        response = self.llm.invoke(messages)
        return response.content.strip() if response else ""

    def generate_question(self, resume_summary: str) -> str:
        prompt = PromptTemplate(
            template="You are a Behavioral Interviewer. Based on the resume summary, generate a question to ask the candidate:\n\n{resume_summary}",
            input_variables=["resume_summary"],
        )

        chain = LLMChain(llm=self.llm, prompt=prompt)
        return chain.run(resume_summary=resume_summary)

    def process_answer(self, question: str, answer: str) -> str:
        """
        Processes the answer given by the candidate.
        :param question: The question to the candidate.
        :param answer: The answer provided by the candidate.
        :return: A response based on the answer.
        """
        prompt = PromptTemplate(
            template=(
                "Question: {question}\n"
                "Answer: {answer}\n"
                "Provide feedback on the answer and ask a logical question follow-up based on the answer provided or new question.\n"
            ),
            input_variables=["question", "answer"],
        )
        chain = LLMChain(llm=self.llm, prompt=prompt)
        response = chain.run(question=question, answer=answer)
        return response

    async def generate_feedback(
        self,
        text: str,
    ):
        """
        Generates a feedback based on the provided text using the LLM.
        :param text:
        :return:
        """
        prompt_template = PromptTemplate(
            template=(
                "score: 0-10\n"                
                "strengths: List of strengths\n"
                "weaknesses: List of weaknesses\n"
                "feedback: General feedback\n\n"
                "You are a helpful assistant. Please provide feedback (give it as json dump) on the following QnA:\n\n{text}"
            ),
            input_variables=["text"],
        )
        chain = LLMChain(llm=self.llm, prompt=prompt_template)
        response = chain.run(text=text)
        clean_response = re.sub(r"```json|```", "", response).strip()
        return json.loads(clean_response)
