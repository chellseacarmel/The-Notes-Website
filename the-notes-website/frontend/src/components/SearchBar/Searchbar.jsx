import React, { useState} from "react";
import {Grid, InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { InputField, InputBox, Container } from "./SearchbarStyled";

export default function SearchBar({search, clearSearch}){

    const [searchValue,setSearchValue] = useState("")

    const handleSearch = async() =>{
       search(searchValue)
    }

    const handleClear = async() => {
        setSearchValue("")
        clearSearch()
    }

    return (
        <div>
            <Container container justifyContent="center" >
                <Grid item xs={10} s={9} md={7} lg={5}>
                        <Grid item>
                            <InputBox>
                            <InputField
                            fullWidth
                            placeholder = "Search"
                            value = {searchValue}
                            onChange={(e)=>setSearchValue(e.target.value)}
                            type="text"
                            endAdornment={
                                <InputAdornment position="end">

                            { searchValue !=="" &&
                            <IconButton
                            aria-label="close"
                            onClick={handleClear}
                            edge="end" 
                            sx={{marginRight:"1px"}}
                            >
                           <CloseIcon/>
                          </IconButton>
                          }
                          <IconButton
                            aria-label="search"
                            onClick={handleSearch}
                            edge="end"
                            
                          >
                           <SearchIcon/>
                          </IconButton>
                        </InputAdornment>
                            }
                            />
                            </InputBox>
                        </Grid>
                </Grid>
            </Container>
        </div>
    )
}
