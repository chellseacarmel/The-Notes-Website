import { styled } from '@mui/material/styles';
import {Fab,Grid,Box} from '@mui/material';

export const StyledFab = styled(Fab) ({
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
    backgroundColor: '#333', 
    },
})

export const Container = styled(Grid)({
    marginLeft: '5vh'
  });

export const HelperContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh"

})
