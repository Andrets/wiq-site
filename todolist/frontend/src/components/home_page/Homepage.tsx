import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export const Homepage: FC = () => {
    const navigate = useNavigate()
    

    
    return (
        <>
            <Container maxWidth="xs" className='center'>
                <Stack spacing={3}>
                    <Button to="/create-order" component={Link} variant="contained">
                        Create an order
                    </Button>
                    <Button onClick={() => {}} variant="contained">
                        SignOut
                    </Button>
                </Stack>
            </Container>
        </>
    )
}