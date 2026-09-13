from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os

from pipeline import process_voice_note


app = FastAPI()


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Voice Action Items API is running"}


@app.post("/process")
def process_audio(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = process_voice_note(file_path)

        return result

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)