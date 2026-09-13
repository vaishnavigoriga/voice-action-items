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

# System Architecture

```text
                         USER
                           |
                           | Upload Audio
                           v
                  +------------------+
                  |  React Frontend  |
                  |    Vite + CSS    |
                  +--------+---------+
                           |
                           | HTTP POST /process
                           v
                  +------------------+
                  |  FastAPI Backend |
                  +--------+---------+
                           |
                           v
                    +-------------+
                    | pipeline.py |
                    +------+------+
                           |
              +------------+------------+
              |                         |
              v                         v
    +------------------+      +------------------+
    | transcription.py |      |      llm.py      |
    +--------+---------+      +--------+---------+
             |                         |
             v                         v
        +---------+               +---------+
        | Gemini  |               | Gemini  |
        |   AI    |               |   AI    |
        +----+----+               +----+----+
             |                         |
             v                         v
        Transcript              Summary + Tasks
             |                         |
             +------------+------------+
                          |
                          v
                    JSON Response
                          |
                          v
                   React Frontend
                          |
                          v
                   Results Display
#Application Flow

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

React receives the response and displays:

Transcript
AI summary
Action items
Deadlines
Tech Stack
Frontend
React
Vite
JavaScript
CSS
Fetch API
Backend
Python
FastAPI
Uvicorn
Pydantic
python-dotenv
AI
Google Gemini API
Development Tools
Git
GitHub
VS Code
#Project Structure
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
#Backend Components
main.py

Creates the FastAPI server and exposes the API endpoints.

The main processing endpoint is:

POST /process

It:

Receives the uploaded audio file
Temporarily stores the file
Sends it to the processing pipeline
Returns the processed result
transcription.py

Responsible for converting the uploaded audio into text using Gemini.

Audio
  |
  v
Gemini
  |
  v
Transcript
llm.py

Analyzes the transcript using Gemini and generates:

Summary
Action items
Deadlines

The generated response is validated using Pydantic.

schemas.py

Defines the expected structure of the AI response.

The main structure is:

VoiceNoteResult
|
+-- summary
|
+-- action_items
    |
    +-- task
    +-- deadline

Each action item contains:

task      -> The action that needs to be completed
deadline  -> Explicitly mentioned deadline, if available
pipeline.py

Connects the complete backend workflow.

Audio
  |
  v
Transcription
  |
  v
Transcript
  |
  v
AI Analysis
  |
  v
Summary + Action Items

It acts as the central processing layer of the application.

#Frontend

The React application provides the user interface for interacting with the system.

It includes:

Audio file selection
Drag-and-drop upload
File information display
Processing state
Transcript display
AI-generated summary
Action item cards
Deadline display
Copy buttons
New note / clear functionality
Responsive interface

The frontend communicates with FastAPI using an HTTP request.

React
  |
  v
fetch()
  |
  v
FastAPI
  |
  v
JSON Response
  |
  v
React UI
API
GET /

Checks whether the backend is running.

Example Response
{
  "message": "Voice Action Items API is running"
}
POST /process

Accepts an audio file and processes it using the AI pipeline.

Request
multipart/form-data
file = audio file
Response
{
  "transcript": "...",
  "summary": "...",
  "action_items": [
    {
      "task": "...",
      "deadline": "..."
    }
  ]
}
Environment Variables

The Gemini API key is stored in a .env file inside the backend.

Create:

backend/.env

Add:

GEMINI_API_KEY=your_api_key_here

The .env file is excluded from Git using .gitignore.

Important

Never commit API keys or other secrets to GitHub.

The API key remains on the backend and is never placed directly inside the React frontend.

React Frontend
      |
      v
FastAPI Backend
      |
      v
Gemini API
Running Locally
Prerequisites

Install the following:

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
Testing

The backend contains separate test files for validating different parts of the application.

Gemini Connection
python test_gemini.py
Audio Transcription
python test_transcription.py
AI Summary and Action Items
python test_llm.py
Complete Pipeline
python test_pipeline.py

The complete pipeline test verifies:

Audio
  |
  v
Transcription
  |
  v
Transcript
  |
  v
AI Analysis
  |
  v
Summary
  |
  v
Action Items
Security

The project follows basic security practices:

API key stored in environment variables
.env excluded from Git
Gemini API key kept on the backend
API key is not exposed in frontend code
Uploaded files are temporarily processed
Temporary files are removed after processing

For production deployment, additional security and validation would be required.

Current Limitations

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

Possible future improvements include:

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

Possible deployment:

Frontend -> Vercel
Backend  -> Render
Better Audio Support

Improve handling of different audio formats and larger files.

Batch Processing

Allow users to upload and process multiple voice notes together.

Persistent Storage

Add a database for storing:

Voice notes
Transcripts
Summaries
Action items
Deadlines
Learning Outcomes

This project provides practical experience with:

React frontend development
FastAPI backend development
REST API communication
File uploads
HTTP requests
AI API integration
Speech-to-text processing
Prompt engineering
Structured AI outputs
Pydantic validation
Environment variable security
CORS
Git and GitHub workflows
Full-stack application architecture
Project Flow at a Glance
User
 |
 | Upload Voice Note
 v
React Frontend
 |
 | HTTP Request
 v
FastAPI Backend
 |
 v
Processing Pipeline
 |
 +----------------------+
 |                      |
 v                      v
Transcription        AI Analysis
 |                      |
 v                      v
Gemini               Gemini
 |                      |
 v                      v
Transcript        Summary + Tasks
 |                      |
 +----------+-----------+
            |
            v
      JSON Response
            |
            v
      React Frontend
            |
            v
      Results Display
Key Takeaway

The main idea behind this project is simple:

Don't just transcribe voice. Turn voice into action.
