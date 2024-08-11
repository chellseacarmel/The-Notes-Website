import React, { useState} from "react";
import { Typography, CardContent, IconButton,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useNavigate } from "react-router-dom";
import {StyledDiv, StyledIconHolder} from './NotethumbnailStyled'

// Element to create note thumbnails displayed to preview notes in the homepage.
export default function NoteThumbnail({note, deleteNote, pinUnpin}){
    
    const [isPinned, setIsPinned] = useState(note.is_pinned)

    const navigate = useNavigate()

    const handleDelete = async(event)=> {
        event.stopPropagation()
        deleteNote(note.note_id)

    }
    const handlePin = async(event)=> {
        setIsPinned(false)
        event.stopPropagation()
        pinUnpin(note)
        
    }
    const handleUnpin = async(event) => {
        setIsPinned(true)
        event.stopPropagation()
        pinUnpin(note)
    }
    const openNote = async() =>{
        navigate("/note",{state:note.note_id})
    }

    return (
        <StyledDiv onClick={openNote}>
            <CardContent>

                <Typography variant="h6" fontWeight={"bold"} paddingBottom={"0px"} aria-label="title">
                    {note.title}
                </Typography>

                <Typography variant="body2" fontWeight={"light"}paddingBottom={"10px"} aria-label="date created">
                    {note.date_created}
                </Typography>

                <Typography variant="body1" aria-label="content">
                    {note.content}
                </Typography>

                <StyledIconHolder>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                    {isPinned ? 
                    <IconButton aria-label="pin" onClick={handleUnpin}>
                    <PushPinIcon sx={{color:"#F24822"}}/>
                    </IconButton>
                :
                <IconButton aria-label="pin" onClick={handlePin}>
                <PushPinIcon/>
                </IconButton>
                }
                </StyledIconHolder>

            </CardContent>
      </StyledDiv>
    )
}
