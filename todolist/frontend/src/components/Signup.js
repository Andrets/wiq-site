import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Stack, Grid } from '@mui/material';
import { Link } from "react-router-dom";


export default function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState('');
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password,
                email: email,
            }),
        };
        fetch('/api/signup', requestOptions)
        .then((response) => {
            if (response.ok) {
                setAuth(true)
                console.log('sign up was successfull')
            } else {
                setError('долбаеб')
            }
        })
    }

    return (
        <React.Fragment>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
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
                </Stack>
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
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>
                <Grid>
                    <a href='/login'>Already have an accout?</a>
                </Grid>
            </small>
     
        </React.Fragment>
    )
}