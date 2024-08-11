import { styled } from '@mui/material/styles';
import {AppBar,Toolbar, Typography, Button, IconButton, MenuItem} from '@mui/material'

export const StyledTypography = styled(Typography)({
    fontFamily: 'Roboto, sans-serif', 
    fontWeight: 'bold', 
  });

export const StyledAppBar = styled(AppBar)({
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky' 
 });

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
  });

export const StyledButton = styled(Button)({
    height: '35px',
    fontSize: '14px',
    borderRadius: '9px',
    padding: '15px',
    backgroundColor: '#000', 
    textTransform: 'none',
    color: '#fff', 
    '&:hover': {
    backgroundColor: '#333', 
    },
  });

export const RoundedButton = styled(IconButton)({
    textTransform: 'none',
    backgroundColor: '#DEDEDE',
    width: '45px',
    height: '45px'

  })

export const MenuTypography = styled(Typography)({
    marginLeft: "5px",
    fontWeight:"bold",
    fontSize: "20px",
    padding: "10px",
    display: "flex",
    alignItems:"center",

  })

export const StyledMenuItem = styled(MenuItem)({
    justifyContent:"center",
    backgroundColor:'black', 
    color:'white',
    '&:hover':{
       backgroundColor: "#333"
    }
  })
