from pydantic import BaseModel
from typing import Optional


class ActionItem(BaseModel):
    task: str
    deadline: Optional[str] = None


class VoiceNoteResult(BaseModel):
    summary: str
    action_items: list[ActionItem]