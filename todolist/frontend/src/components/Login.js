import React, { useState, useEffect, useContext, createContext } from 'react';
import { Grid, TextField, Button, Stack, Alert, Snackbar, Container, CssBaseline, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookies from 'js-cookie';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [authstatus, setAuthstatus] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [mode, setMode] = useState('light')
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const hanldeSubmit = (event) => {
        event.preventDefault();
        console.log(password, username)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickway') {
            return;
        }
        setOpen(false);
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        }
    })

    function handleLogin() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            })
        };
        fetch('/api/login', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const token = data.token;
                    Cookies.set('token', token);
                    setAuthstatus(true);
                    navigate('/');
                })
            } else { 
                setMessage({
                    message: "Wrong password or username! Please check entered data"
                });
                setSnackbarSeverity('error');
                setOpen(true);
            }
        })
        .catch((error) => {
            console.error('error', error)
        })
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>  
                <CssBaseline>  
                    <Container className='center' maxWidth="xs">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Log in</h2>
                        <form onSubmit={hanldeSubmit}>
                            <Stack spacing={2} direction="column" sx={{marginBottom: 4, minWidth: 400}}>
                                <TextField
                                    type='text'
                                    variant='outlined'
                                    color='primary'
                                    label='Username or Email'
                                    onChange={handleUsernameChange}
                                    value={username}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    type='password'
                                    variant='outlined'
                                    color='primary'
                                    label='Password'
                                    onChange={handlePasswordChange}
                                    value={password}
                                    fullWidth
                                    required
                                    sx={{mb: 4}}
                                />
                            </Stack>
                            <Grid>
                                <Button variant="contained" color="secondary" type="submit" onClick={handleLogin} sx={{marginRight: 15}}>
                                    Log in
                                </Button>
                                <a href='/signup'>Sign Up</a>
                            </Grid>
                        </form>
                    </Container>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{alignItems: 'center'}}>
                            {message && message.message}
                        </Alert>
                    </Snackbar>
                </CssBaseline>
            </ThemeProvider>
        </React.Fragment>
    )
}