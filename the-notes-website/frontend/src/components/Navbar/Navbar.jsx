import React, {useEffect, useState} from "react";
import { Menu} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StyledTypography,StyledAppBar, StyledToolbar, StyledButton, RoundedButton, MenuTypography, StyledMenuItem } from "./NavbarStyled";

export default function NavBar({ pageType}) {

    // States to manage avatar dropdown
    const [anchorElem,setAnchorElem] = useState(null)
    const [userName,setUserName]= useState("")

    const navigate = useNavigate()

    const handleOpen = (e) =>{
        setAnchorElem(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorElem(null)
    }
    const handleLogout = () =>{

        navigate("/")
        sessionStorage.clear()

    }

    useEffect(()=>{

        const getUserName = async() =>{
    
          const userId = sessionStorage.getItem("userId")
          console.log(userId)
    
          if(userId){
            try {
            const token = sessionStorage.getItem("token")
            const user = await axios.get( `http://localhost:8000/user/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                  }
            })
            setUserName(user.data.username)
            
            }
            catch(e){
            console.log("Error fetching data")
            }
          }
        }
    
        getUserName()
    
      },[])


    return (
        <StyledAppBar position='fixed'color='common'>
            <StyledToolbar color='white'>

                <StyledTypography variant="h6" >
                    The Notes Website
                </StyledTypography>

                {pageType==="login" && <StyledButton href='/signup'>Sign Up</StyledButton>}
                {pageType==="signup" && <StyledButton href='/'>Login</StyledButton>}
                {pageType==="home" && 
                <>
                <RoundedButton aria-label="avatar" size="large" onClick={handleOpen}>{userName.toUpperCase().charAt(0)}</RoundedButton>
                <Menu anchorEl={anchorElem} open={Boolean(anchorElem)} onClose={handleClose} sx={{borderReadius:'10%'}}>
                <MenuTypography>{userName}</MenuTypography>
                <StyledMenuItem aria-label="log out" onClick={handleLogout}>Logout</StyledMenuItem>
                </Menu>
                </>
                }             
            </StyledToolbar>
        </StyledAppBar>
    )
}
