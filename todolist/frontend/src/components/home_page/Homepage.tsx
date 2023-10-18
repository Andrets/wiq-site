import React, { FC, useEffect } from 'react';
import Cookies from 'cookies-js';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export const Homepage: FC = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch('/api/checkuser', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                null
            } else {
                navigate('/login')
            }
        })
    }, [])
    
    const handleOnClick = () => {
        fetch('/api/signout')
        .then((response) => {
            navigate('/login')
        })
    }
    
    return (
        <>
            <Container maxWidth="xs" className='center'>
                <Stack spacing={3}>
                    <Button to="/create-order" component={Link} variant="contained">
                        Create an order
                    </Button>
                    <Button onClick={handleOnClick} variant="contained">
                        SignOut
                    </Button>
                </Stack>
            </Container>
        </>
    )
}