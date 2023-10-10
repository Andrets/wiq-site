import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Stack, Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookies from 'js-cookie';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [authstatus, setAuthstatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

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
        .then((response) => response.json())
        .then((data) => {
            const token = data.token;
            Cookies.set('token', token);
            setAuthstatus(true);
            navigate('/')
        })
        .catch((error) => {
            console.error('error', error)
        })
    }

    return (
        <React.Fragment>
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
                {authstatus ? (
                    <Alert severity="success" sx={{marginTop: 3}}>
                        Log in successfull!
                    </Alert>
                    ) : (
                        <Alert severity="error" sx={{marginTop: 3}}>
                            Wrong password or username
                        </Alert>
                    )
                }
            </form>

        </React.Fragment>
    )
}