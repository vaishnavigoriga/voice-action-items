from transcription import transcribe_audio


audio_path = r"audio/gemini_test_voice.wav"

transcript = transcribe_audio(audio_path)

print("\nTRANSCRIPT:")
print(transcript)