import os

from dotenv import load_dotenv
from google import genai

from schemas import VoiceNoteResult


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_summary(transcript: str):

    prompt = f"""
You are an AI assistant that processes voice notes.

Analyze the transcript below.

Your tasks:

1. Create a short and clear summary.
2. Extract every genuine actionable task.
3. Include a deadline only when it is explicitly mentioned.
4. If a task has no explicit deadline, use null.
5. Do not invent tasks or deadlines.
6. Ignore unnecessary filler words.

Transcript:

{transcript}
"""

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": VoiceNoteResult.model_json_schema()
        },
    )

    result = VoiceNoteResult.model_validate_json(
        interaction.output_text
    )

    return result