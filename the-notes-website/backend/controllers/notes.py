from bson.binary import Binary
from uuid import UUID

from models.note_model import *
from database import *

notes_db = connect("notes")


def add_new_note(note: Note):
    notes_db.insert_one(note.model_dump())
    return note

def edit_note(note: Note, note_id: str):
    notes_db.update_one(
            {"note_id":note_id},
            {"$set":note.model_dump()}
        )
    return note

def delete_note_by_id(note_id: str):
    result = notes_db.delete_one({"note_id": note_id})
    return result.deleted_count

def get_notes_by_id(user_id: str):
    notes = []
    cursor = notes_db.find({"user_id": user_id})
    for note in cursor:
        new_note = Note(note_id= note["note_id"],
                title= note["title"],
                content= note["content"],
                user_id= note["user_id"],
                date_created= note["date_created"],
                is_pinned= note["is_pinned"])
        notes.append(new_note)
    return notes

def get_note_by_id(note_id: str):
    result = notes_db.find_one({"note_id": note_id})
    return Note(note_id= result["note_id"],
                title= result["title"],
                content= result["content"],
                user_id= result["user_id"],
                date_created= result["date_created"],
                is_pinned= result["is_pinned"])

def search_note_by_keywords(keywords: str, user_id: str):
    cursor = notes_db.find({"$text": {"$search": keywords}, "user_id": user_id})
    notes = []
    for note in cursor:
        new_note = Note(note_id= note["note_id"],
                title= note["title"],
                content= note["content"],
                user_id= note["user_id"],
                date_created= note["date_created"],
                is_pinned= note["is_pinned"])
        notes.append(new_note)
    return notes
