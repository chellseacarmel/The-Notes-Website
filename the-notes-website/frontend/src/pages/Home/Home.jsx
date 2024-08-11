import {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/Searchbar";
import NoteThumbnail from "../../components/NoteThumbnail/Notethumbnail";
import {Grid, Typography, Divider} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { StyledFab, Container, HelperContainer } from './HomeStyled';


export default function Home() {

  const [notes, setNotes] = useState([]) // State to manage the currently displayed notes
  const [searchPerformed,setSearchPerformed]= useState(false) 

  const pinnedNotes = notes.filter(note => note.is_pinned)
  const unpinnedNotes = notes.filter(note => !note.is_pinned)

  const fetchNotes = async() =>{

    const userId = sessionStorage.getItem("userId")

    if(userId){
      try {
      const token = sessionStorage.getItem("token")
      const userNotes = await axios.get( `http://localhost:8000/user/notes/${userId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNotes(userNotes.data)
      
      }
      catch(e){
      console.log("Error fetching data")
      }
    }
  }

  useEffect(()=>{

    fetchNotes()

  },[])

    const deleteNote = async (noteId) =>{
      try {

        const token = sessionStorage.getItem("token")
        await axios.delete( `http://localhost:8000/notes/${noteId}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        setNotes(notes.filter(note => note.note_id!==noteId))
        
        }
      catch(e){
        console.log("Error deleting data")
      }

    }

    // Function to get search results for the given keywords from the server
    const handleSearch = async (keywords) =>{
      try {
        const userId = sessionStorage.getItem("userId")
        const token = sessionStorage.getItem("token")
        const response = await axios.get( 
          `http://localhost:8000/notes/search/${userId}/${keywords}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        setNotes(response.data)
        setSearchPerformed(true)
        
        }
      catch(e){
        console.log("Error getting data")
      }

    }

    // Function to handle displaying of data when the search bar is cleared
    const clearSearch = async() => {
      fetchNotes()
      setSearchPerformed(false)

    }

    // Function to send current pin state to server to keep track
    const togglePinUnpin = async(note)=>{

      try{

        const updatedNote = {...note, is_pinned: !note.is_pinned}
        const token = sessionStorage.getItem("token")
        await axios.put( `http://localhost:8000/notes/${note.note_id}`,
          updatedNote, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setNotes(notes.map(n => (n.note_id=== note.note_id ? updatedNote : n)))

      }
      catch(e){
        console.log("Error updating data")
      }

    }

    return(
        <>
        <NavBar pageType={"home"}></NavBar>
        { (notes && notes.length > 0) ? 
            <>
            <SearchBar search={handleSearch} clearSearch={clearSearch}/>
        <Container container justifyContent="flex-start" spacing={3}>

        {pinnedNotes.map((card, index) => (
          <Grid item key={index}>
            <NoteThumbnail note={card} deleteNote={deleteNote} pinUnpin={togglePinUnpin}/>
          </Grid>
        ))}

        { pinnedNotes.length > 0 && unpinnedNotes.length > 0 ?
        <Grid item xs={11}>
          <Divider/>
        </Grid>
        :""
        }

        {unpinnedNotes.map((card, index) => (
          <Grid item key={index}>
            <NoteThumbnail note={card} deleteNote={deleteNote} pinUnpin={togglePinUnpin}/>
          </Grid>
        ))}

        </Container>
        </>
        :
        searchPerformed ? 
        <>
        <SearchBar search={handleSearch} clearSearch={clearSearch}/>
        <HelperContainer sx={{height:"50vh"}}>
        <Typography fontWeight={"bold"} variant="h5">No results found.</Typography>
        </HelperContainer>
        </>
        :
        <>
        <HelperContainer>
        <Typography fontWeight={"bold"} variant="h5">Click on the + button to Add a Note</Typography>
        </HelperContainer>
        </>
        
      }
        <StyledFab
            aria-label='add'
            href='/note'
          >
            <AddIcon />
          </StyledFab>
      </>
    )
}
