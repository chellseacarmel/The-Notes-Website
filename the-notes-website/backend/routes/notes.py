from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException

from controllers.notes import *
from models.note_model import *
from models.user_model import *

from utils.jwt import authenticate_user

router = APIRouter()

@router.get("/notes/{note}")
async def get_note(note: str, auth: bool= Depends(authenticate_user)):
    if auth:
        return get_note_by_id(note)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.put("/notes/")
async def add_note(note: NoteInput, auth: bool= Depends(authenticate_user)):
    if auth:
        new_note = Note(
            note_id= uuid4().hex,
            date_created= note.date_created,
            title= note.title,
            is_pinned= note.is_pinned,
            content= note.content,
            user_id= note.user_id
        )
        return add_new_note(new_note)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.put("/notes/{note_id}")
async def update_note(note: Note, note_id: str, auth: bool= Depends(authenticate_user)):
    if auth:
        return edit_note(note,note_id)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.delete("/notes/{note}")
async def delete_note(note: str, auth: bool= Depends(authenticate_user)):
    if auth:
        return delete_note_by_id(note)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/user/notes/{user}")
async def get_notes(user: str, auth: bool= Depends(authenticate_user)):
    if auth:
        return get_notes_by_id(user)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.get("/notes/search/{user_id}/{keywords}")
async def search_note(keywords: str, user_id: str, auth: bool= Depends(authenticate_user)):
    if auth:
        return search_note_by_keywords(keywords,user_id)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

