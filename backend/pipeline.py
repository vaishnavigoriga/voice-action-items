from transcription import transcribe_audio
from llm import generate_summary


def process_voice_note(file_path: str):
    # Step 1: Convert audio to text
    transcript = transcribe_audio(file_path)

    # Step 2: Generate summary and action items
    result = generate_summary(transcript)

    # Step 3: Return everything
    return {
        "transcript": transcript,
        "summary": result.summary,
        "action_items": [
            {
                "task": item.task,
                "deadline": item.deadline
            }
            for item in result.action_items
        ]
    }