import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export const Homepage: FC = () => {
    const navigate = useNavigate()
    
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/checkuser")
        .then((response) => {
            if (response.status === 200) {
                navigate('/login')
            } else {
                navigate('/login')
            }
        }).catch((error) => {
            console.log('error')
        })
    }, [])
    
    const handleOnClick = () => {
        axios({
            url: 'http://localhost:8000/api/signout',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                navigate('/login')
            } else {
                null
            }
        }).catch((error) => {
            console.log(error)
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