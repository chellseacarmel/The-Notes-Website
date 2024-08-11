import { styled } from '@mui/material/styles';
import noteImage from '../../components/NoteThumbnail/sticky-yellow.svg'
import {Grid, Typography, Button, InputBase} from '@mui/material';

export const StyledDiv = styled('div')({
    position: "relative",
    backgroundImage: `url(${noteImage})`,
    height: '70vh',
    aspectRatio: '800/500',
    backgroundSize: 'cover',

  });

export const TitleInputField = styled(InputBase)({
    marginLeft: '16px',
    marginTop: '18px',
    height: '48px', 
    fontSize: '45px',
    fontWeight: 'bold',
    width: '97%',
  });

export const InputField = styled(InputBase)({
    marginLeft: '16px',
    marginTop: '22px',
    height: '24px', 
    fontSize: '20px',
    width: '97%',


  });

export const StyledTypography = styled(Typography)({
    marginLeft: '16px',
    fontSize: '17px',
    fontWeight: 'light'
  })

export const Container = styled(Grid)({
    marginLeft: '15vh',
    position: "sticky",
    marginTop: '5vh',
  });

export const ContentWrapper = styled(Grid)({
    padding: '10px',
  });

export const StyledButton = styled(Button)({
    color: "gray",
    textTransform: "none",
    fontSize: "15px"
  });
