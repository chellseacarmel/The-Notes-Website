import React, { useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import {Typography,Grid, InputAdornment,IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import {Title,Container,StyledPaper,InputField,InputBox,StyledInputBox,
StyledButton,LoginButton, ButtonGrid,ContentWrapper} from './SignupStyled'

export default function SignupForm() {

  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');

  const [showPassword, setShowPassword] = useState(false);

  // States for handling errors
  const [passwordError, setPasswordError] = useState(false); 
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [signupError,setSignupError] = useState(false)

  const navigate = useNavigate();
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async() => {
    if (checkEmail(emailRef.current.value) && checkPassword(passwordRef.current.value)){

        try {

            await axios.post( `http://localhost:8000/signup`,
                {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                }
            )
            navigate('/')
        }
        catch(e){
            setSignupError(true)
        }
 
    }
  }

  // Function to check if the password is strong
  const checkPassword = (password) =>{
    
     if (password.length < 8) {
        setPasswordErrorMsg('Password must be at least 8 characters long.');
        setPasswordError(true)
        return false;
      }
      if (!/[A-Z]/.test(password)) {
        setPasswordErrorMsg('Password must include at least one uppercase letter.');
        setPasswordError(true)
        return false;
      }
      if (!/[a-z]/.test(password)) {
        setPasswordErrorMsg('Password must include at least one lowercase letter.');
        setPasswordError(true)
        return false;
      }
      if (!/[0-9]/.test(password)) {
        setPasswordErrorMsg('Password must include at least one number.');
        setPasswordError(true)
        return false;
      }
      if (!/[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-]/.test(password)) {
        setPasswordErrorMsg('Password must include at least one special character.');
        setPasswordError(true)
        return false;
      }
      setPasswordError(false)
      return true;
  }

  // Function to check of it is a valid email.
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
                    Sign Up
                  </Title>
                </Grid>

                {signupError? <Grid item>
                  <StyledInputBox aria-live="assertive">
                    <ErrorIcon aria-hidden="true"/>
                    Email already exists.
                  </StyledInputBox>
                </Grid>
                :""}

                <Grid item>
                  <InputBox>
                    <InputField
                      fullWidth
                      placeholder="Username"
                      inputRef={usernameRef}
                      type="text"
                      aria-label="username"
                    />
                  </InputBox>
                </Grid>

                <Grid item>
                  <InputBox style={{
                        border: `2px solid ${emailError ? '#D2042D' : 'white'}`,
                      }}>
                    <InputField
                      fullWidth
                      placeholder="Email"
                      inputRef={emailRef}
                      type="text"
                      aria-label="Email"
                      aria-invalid={emailError}
                      aria-describedby="email-error"
                    />
                  </InputBox>
                  <Typography style={{
                        color: `${emailError ? '#D2042D' : 'white'}`,
                      }}>{emailError?"Please enter a valid email":""}</Typography>
                </Grid>

                <Grid item>
                  <InputBox style={{
                        border: `2px solid ${passwordError ? 'red' : 'white'}`,
                      }}>
                    <InputField
                      fullWidth
                      placeholder="Password"
                      inputRef={passwordRef}
                      type={showPassword ? 'text' : 'password'}
                      aria-label = "password"
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
                  <Typography style={{
                        color: `${passwordError ? 'red' : 'white'}`,
                      }}>{passwordError? passwordErrorMsg:""}</Typography>
                </Grid>

                <ButtonGrid item>
                  <StyledButton
                    fullWidth
                    variant="contained"
                    aria-label="sign up"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </StyledButton>
                </ButtonGrid>

                <Grid item container direction='row' alignItems='center' justifyContent='center'>
                  <Grid item>
                    <Typography>Already have an account?</Typography>
                  </Grid>
                  <Grid item>
                    <LoginButton href='/'>Login</LoginButton>
                  </Grid>
                </Grid>

              </ContentWrapper>
            </StyledPaper>
          </Grid> 
        </Container>
      </div>
    )
}
