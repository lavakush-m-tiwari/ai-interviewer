from PyPDF2 import PdfReader
from io import BytesIO


class FileService:
    @staticmethod
    def extract_pdf_text(file_content: bytes) -> str:
        text = ""
        reader = PdfReader(BytesIO(file_content))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        return text.strip()
