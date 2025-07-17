from fastapi import FastAPI
from view import router

app = FastAPI()
app.include_router(router, prefix="/api", tags=["interview"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
