from pipeline import process_voice_note


audio_path = r"audio/gemini_test_voice.wav"

result = process_voice_note(audio_path)

print("\n===== TRANSCRIPT =====")
print(result["transcript"])

print("\n===== SUMMARY =====")
print(result["summary"])

print("\n===== ACTION ITEMS =====")

for item in result["action_items"]:
    print("Task:", item["task"])
    print("Deadline:", item["deadline"])