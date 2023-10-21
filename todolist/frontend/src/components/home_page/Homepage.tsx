import React, { FC, useEffect } from 'react';
import { getAuth, getOut } from '../../utils/requests';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export const Homepage: FC = () => {
    const navigate = useNavigate()
    
    
    useEffect(() => {
        getAuth.then((response) => {
            if (response.status === 200) {
                console.log(response)
            } else {
                navigate('/login')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    
    const handleOnClick = () => {
        getOut.then((response) => {
            if (response.status === 200) {
                console.log(response)
                navigate('/login')
            } else {
                console.log('Xz')
            }
        })
        .catch((error) => {
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