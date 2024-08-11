import { styled } from '@mui/material/styles';
import { Paper, InputBase, Typography, Button, Grid} from '@mui/material';

 
export const Title = styled(Typography)({
    paddingLeft: '10px',
    fontSize: '32px',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    fontWeight: 'bold'
  });
  
export const Container = styled(Grid)({
    position: 'fixed',
    top: '25%',
  });
  
export const StyledPaper = styled(Paper)({
    minHeight: '400px',
    borderRadius: '19px',
  });
  
export const InputField = styled(InputBase)({
    marginLeft: '16px',
    marginTop: '18px',
    height: '24px', 
    fontSize: '18px',
    width: '90%',
  });
  
export const InputBox = styled(Paper)({
    borderRadius: '8px',
    height: '58px',
    boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
  });
  
export const StyledInputBox = styled(Paper)({ 
    display:'flex',
    gap:'8px',
    fontSize: '18px',
    borderRadius: '8px',
    height: '58px',
    boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
    background: '#D2042D',
    color: 'white',
    padding:'18px',
  });
  
export const StyledButton = styled(Button)({
    height: '50px',
    fontSize: '18px',
    borderRadius: '9px',
    backgroundColor: '#000', 
    textTransform: 'none',
    color: '#fff', 
    '&:hover': {
    backgroundColor: '#333', 
    },
  });

export const SignupButton = styled(Button)({
    paddingLeft: "0",
    textTransform: 'none'
  })
  
export const ButtonGrid = styled(Grid)({
    marginTop: '10px', 
    marginLeft: '10px', 
    marginRight: '10px',
  });
  
export const ContentWrapper = styled(Grid)({
    padding: '20px',
  });
  