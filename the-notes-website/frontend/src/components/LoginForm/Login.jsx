import React, { useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import { 
  Title, Container,StyledPaper,InputField,InputBox,StyledInputBox,
    StyledButton,SignupButton,ButtonGrid,ContentWrapper 
} from "./LoginStyled";


export default function LoginForm() {

  const passwordRef = useRef('');
  const emailRef = useRef('');
  
  // States for error handling
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError,setLoginError] = useState(false)

  const navigate = useNavigate();
 
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async() => {
    if (checkEmail(emailRef.current.value)){
        
        try {

            const response = await axios.post( `http://localhost:8000/login`,
                {
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                }
            )
            sessionStorage.setItem('userId',response.data.id)
            sessionStorage.setItem('token',response.data.token)

            navigate('/home')
        }
        catch(e){
            setLoginError(true)
        }
    }
  }

  // Function to check if it is a valid email.
  const checkEmail = (email) => {

    const atIndex = email.indexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
      setEmailError(true);
      return false;
    }
    
    const domainPart = email.slice(atIndex + 1);
    if (domainPart.indexOf('.') === -1 || domainPart.endsWith('.')) {
      setEmailError(true);
      return false;
    }

    setEmailError(false);
    return true

  }

    return(
        <div>
        <Container container justifyContent="center">
          <Grid item xs={10} s={8} md={6} lg={4}>
            <StyledPaper>
              <ContentWrapper container direction="column" spacing={3}>

                <Grid item>
                  <Title>
                    Login
                  </Title>
                </Grid>

                {loginError ? <Grid item>
                  <StyledInputBox aria-live="assertive">
                    <ErrorIcon aria-hidden="true"/>
                    Incorrect email or password.
                  </StyledInputBox>
                </Grid>
                :""}

                <Grid item>
                  <InputBox style={{
                        border: `2px solid ${emailError ? '#D2042D' : 'white'}`,
                      }}>
                    <InputField
                      fullWidth
                      placeholder="Email"
                      inputRef={emailRef}
                      type="text"
                      aria-label="email"
                      aria-invalid={emailError}
                      aria-describedby="email-error"
                    />
                  </InputBox>
                  <Typography style={{
                        color: `${emailError ? '#D2042D' : 'white'}`,
                      }}>{emailError?"Please enter a valid email":""}</Typography>
                  </Grid>

                <Grid item>
                  <InputBox>
                    <InputField
                      fullWidth
                      placeholder="Password"
                      inputRef={passwordRef}
                      aria-label="password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </InputBox>
                  </Grid>

                <ButtonGrid item>
                  <StyledButton
                    fullWidth
                    onClick={handleLogin}
                    aria-label="login"
                    variant="contained">
                    Log In 
                  </StyledButton>
                </ButtonGrid>

                <Grid item container direction='row' alignItems='center' justifyContent='center'>
                  <Grid item>
                    <Typography>Don't have an account yet?</Typography>
                  </Grid>
                  <Grid item>
                    <SignupButton href='/signup'>Sign Up</SignupButton>
                  </Grid>
                </Grid>

              </ContentWrapper>
            </StyledPaper>
          </Grid> 
        </Container>
      </div>
    )
}
