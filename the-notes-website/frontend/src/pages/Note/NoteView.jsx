import React, {useEffect, useState,useRef} from "react";
import NavBar from "../../components/Navbar/Navbar";
import {Grid,CardContent} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { StyledDiv,TitleInputField,InputField,
  StyledTypography,Container,ContentWrapper,StyledButton } from "./NoteStyled";

// Component to display the note during creating and editing.
export default function NoteView() {

    const navigate = useNavigate()

    const titleRef = useRef('');
    const contentRef = useRef('');

    const location = useLocation();

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US',{ year:'numeric', month:'long',day:'numeric'})
    }

    const [note,setNote] = useState(null)
    const [createdDate,setCreatedDate] = useState( formatDate(new Date()))


    useEffect(()=>{

        const fetchNote = async() =>{
    
          const noteId = location.state;
    
          if(noteId){
            try {
            const token = sessionStorage.getItem("token")
            const userNote = await axios.get( `http://localhost:8000/notes/${noteId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                  }
            })
            setNote(userNote.data)
            titleRef.current.value = userNote.data.title || ""
            contentRef.current.value = userNote.data.content || ""
            setCreatedDate(userNote.data.date_created)
            }
            catch(e){
            console.log("Error fetching data")
            }
          }
        }
    
        fetchNote()
    
      },[location])

    // function to save the changes to the note   
    const handleBack = async() =>{

        const noteId = location.state

        // If the note already exists edit the note
        if(noteId){
            try{
                const token = sessionStorage.getItem("token")
                await axios.put( `http://localhost:8000/notes/${noteId}`,{
                    "date_created":note.date_created,
                    "title": titleRef.current.value,
                    "content": contentRef.current.value,
                    "user_id": sessionStorage.getItem("userId"),
                    "is_pinned": note.is_pinned,
                    "note_id": note.note_id
    
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                      }
                })
            }
            catch(e){
                console.log("Error updating data")
            }
        }

        // If the note does not exist create a new note
        else{

            try{
                const token = sessionStorage.getItem("token")
                await axios.put( `http://localhost:8000/notes/`,{
                    "date_created": createdDate,
                    "title": titleRef.current.value,
                    "content": contentRef.current.value,
                    "user_id": sessionStorage.getItem("userId"),
                    "is_pinned": false
    
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                      }
                })
            }
            catch(e){
                console.log("Error updating data")
            }
        }
        navigate('/home')
    }
    
    return(
        <>
        <NavBar pageType={"home"}></NavBar>
        <Container container justifyContent="flex-start">
        <Grid>
        <ContentWrapper container direction="column" spacing={5}>

        <Grid item>
        <StyledButton onClick={handleBack} >
            <CloseIcon/>
            Save and Close
        </StyledButton>
        </Grid>

        <Grid item>
            <StyledDiv>
                <CardContent>
                <TitleInputField aria-label="title" placeholder={"Title"} inputRef={titleRef} type="text">
                </TitleInputField>
                <StyledTypography aria-label="created date">{createdDate}</StyledTypography>
                <InputField aria-label="content" placeholder={"Start writing here...."} multiline maxRows={10} inputRef={contentRef} type="text">
                </InputField>
                </CardContent>
            </StyledDiv>
        </Grid>

        </ContentWrapper>
        </Grid>
        </Container> 
      </>
    )
}
