import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Stack, Grid, Avatar, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookies from 'js-cookie';


export default function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function handleSubmit1() {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password,
                email: email,
            }),
        };
        fetch('/api/signup', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const token = data.token;
            Cookies.set('token', token)
            setRegister(true);
            navigate('/')
        })
        .catch((error) => {
            console.error('error', error)
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(userName, email, password)
    }

    

    return (
        <React.Fragment>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column" sx={{marginBottom: 4, minWidth: 400}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Username"
                        onChange={handleUserNameChange}
                        value={userName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="email"
                        variant='outlined'
                        color='primary'
                        label="Email"
                        onChange={handleEmailChange}
                        value={email}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='primary'
                        label="Password"
                        onChange={handlePasswordChange}
                        value={password}
                        required
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                <Grid>
                    <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit1} sx={{marginBottom: 2, marginRight: 7}}>
                        Sign Up
                    </Button>
                    <a href='/login'>Sign In</a>
                </Grid>
                {register ? (
                    <Alert severity='success'>
                        Sign Up successfull!
                    </Alert>
                ) : (
                    <Alert severity='error'>
                        Please enter reg data!
                    </Alert>
                )}

            </form>
     
        </React.Fragment>
    )
}