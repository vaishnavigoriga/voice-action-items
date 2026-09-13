# Voice → Action Items

An AI-powered voice note application that converts spoken notes into a clear transcript, concise summary, and actionable tasks.

Instead of manually listening to a voice note and figuring out what needs to be done, the application uses AI to understand the audio and organize the important information automatically.

---

## Features

- Upload an audio voice note
- Generate an automatic transcript
- Generate a concise AI summary
- Extract actionable tasks
- Identify explicitly mentioned deadlines
- Copy transcript and summary
- Drag and drop audio files
- Interactive processing state
- Responsive interface
- API key kept securely on the backend

---

## What Problem Does It Solve?

Voice notes are convenient, but they can become difficult to manage when they contain multiple tasks, deadlines, or important information.

For example, a voice note might say:

> "Tomorrow I need to finish the project report and call Rahul about the presentation."

Instead of manually listening to the recording and extracting the tasks, this application produces:

### Summary

The speaker needs to finish the project report and call my friend tomorrow.

### Action Items

- Finish the project report — Tomorrow
- Call friend— Tomorrow

This makes unstructured voice notes easier to understand and act on.

---
### Application Flow

The application processes a voice note through the following steps:

1. Upload Audio

The user selects or drops an audio file into the React application.

2. Send Audio to Backend

React sends the selected audio file to the FastAPI backend using:

POST /process
3. Temporary File Storage

FastAPI temporarily stores the uploaded audio file for processing.

4. Speech-to-Text

The transcription module sends the audio to Gemini.

Audio
  |
  v
Gemini AI
  |
  v
Transcript
5. AI Analysis

The generated transcript is sent to the AI analysis module.

Gemini analyzes the transcript and:

Generates a concise summary
Extracts genuine actionable tasks
Identifies explicitly mentioned deadlines
Avoids inventing tasks or deadlines
Ignores unnecessary filler
6. Structured Output

The AI response is validated using Pydantic schemas.

VoiceNoteResult
|
+-- summary
|
+-- action_items
    |
    +-- task
    +-- deadline
7. JSON Response

FastAPI returns the processed result as JSON.

8. Results Display

### Project Structure
voice-action-items/
|
+-- backend/
|   |
|   +-- audio/
|   |   +-- gemini_test_voice.wav
|   |
|   +-- venv/
|   |
|   +-- main.py
|   +-- pipeline.py
|   +-- transcription.py
|   +-- llm.py
|   +-- schemas.py
|   |
|   +-- test_gemini.py
|   +-- test_transcription.py
|   +-- test_llm.py
|   +-- test_pipeline.py
|
+-- frontend/
|   |
|   +-- src/
|   |   +-- App.jsx
|   |   +-- App.css
|   |   +-- index.css
|   |   +-- main.jsx
|   |
|   +-- package.json
|   +-- package-lock.json
|
+-- .gitignore
+-- README.md

### Install the following:

Python
Node.js
npm
Git

You also need a Gemini API key.

1. Start the Backend

Open a terminal and move into the backend:

cd backend

Activate the virtual environment:

venv\Scripts\activate

Install the required Python packages:

pip install fastapi uvicorn python-multipart python-dotenv google-genai pydantic

Start the FastAPI server:

uvicorn main:app --reload

The backend will run at:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs
2. Start the Frontend

Open another terminal.

Move to the frontend:

cd frontend

Install dependencies:

npm install

Start the Vite development server:

npm run dev

The frontend will run at:

http://localhost:5173

### Current Limitations

The current version is focused on local development and the core AI workflow.

Current limitations include:

Requires an active Gemini API connection
Audio processing depends on the Gemini API
Uploaded audio is temporarily stored during processing
No user authentication
No database or persistent voice-note history
No production deployment yet
Audio format handling can be improved further
Future Improvements

### Possible future improvements include:

Voice Note History

Store previously processed voice notes and their results.

PDF Export

Allow users to export transcripts, summaries, and action items as PDF files.

Task Management

Add task features such as:

Task completion
Priority
Status
Due-date tracking
Sharing

Allow users to share processed voice-note results.

Authentication

Add user accounts and personalized voice-note history.

Cloud Deployment

Deploy the application online.
