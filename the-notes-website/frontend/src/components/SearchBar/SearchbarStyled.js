import { styled } from '@mui/material/styles';
import { Paper, InputBase, Grid} from '@mui/material';


export const InputField = styled(InputBase)({
    marginLeft: '16px',
    marginTop: '18px',
    height: '24px', 
    fontSize: '18px',
    width: '93%',
  });

export const InputBox = styled(Paper)({
    borderRadius: '8px',
    height: '58px',
    boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
  });

export const Container = styled(Grid)({
    position: 'sticky',
    padding: 30,
  });
