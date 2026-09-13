from llm import generate_summary


transcript = """
Tomorrow I need to finish the database assignment.
I also need to call Rahul about the project.
The project presentation is on Friday.
"""


result = generate_summary(transcript)


print("SUMMARY:")
print(result.summary)

print("\nACTION ITEMS:")

for item in result.action_items:
    print("Task:", item.task)
    print("Deadline:", item.deadline)