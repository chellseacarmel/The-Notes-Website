from pydantic import BaseModel

class NoteInput(BaseModel):
    date_created: str
    title: str
    content: str
    user_id: str
    is_pinned: bool


class Note(NoteInput):
    note_id: str
    