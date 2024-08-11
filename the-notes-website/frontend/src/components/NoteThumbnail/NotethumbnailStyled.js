import { styled } from '@mui/material/styles';
import noteImage from './sticky-yellow.svg'


export const StyledDiv = styled('div')({
    position: "relative",
    backgroundImage: `url(${noteImage})`,
    width: '370px',
    height: '240px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer'
  });

export const StyledIconHolder = styled('div')({
        display: "flex",
        position: "absolute",
        right:"7px",
        bottom: "15px",
    })
  
