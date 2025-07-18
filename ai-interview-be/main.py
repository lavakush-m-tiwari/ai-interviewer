from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from view import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router, prefix="/api", tags=["interview"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
