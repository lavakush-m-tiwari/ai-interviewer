import os
from dotenv import load_dotenv

load_dotenv()

# Load environment variables from .env file
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
REDIS_CLIENT_URL = os.getenv("REDIS_CLIENT_URL", "redis://localhost:6379")
REDIS_PORT = os.getenv("REDIS_PORT", 6379)
