import json


from redis import Redis

from settings import REDIS_CLIENT_URL, REDIS_PORT
from typed_dicts.Question import SessionData


class SessionService:
    def __init__(self):
        self.redis_client = Redis(host=REDIS_CLIENT_URL, port=REDIS_PORT, decode_responses=True)

    def create_session(self, session_id: str, data: dict) -> None:
        self.redis_client.set(session_id, json.dumps(data))

    def update_session(self, session_id: str, data: dict) -> None:
        self.redis_client.set(session_id, json.dumps(data))

    def get_session(self, session_id) -> SessionData:
        data = self.redis_client.get(session_id)
        if not data:
            raise ValueError(f"Session {session_id} does not exist.")
        return json.loads(data)

    def is_valid_session(self, session_id):
        return self.redis_client.exists(session_id) > 0


session_service = SessionService()
