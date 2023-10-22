import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, TextField, Typography, Button, Stack } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { loginValidation, passwordValidation } from './validation';


interface ISignInForm {
    login: string;
    password: string;
}


export const Login: FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<ISignInForm>();

    const { errors } = useFormState({
        control
    })

    useEffect(() => {
        axios.get("http://localhost:8000/api/checkuser")
        .then(response => {
            if (response.status === 200) {
                navigate('/')
            } else {
                console.log('Ннихуя')
            }
        })
        .catch((error) => {
            console.log('ERROR')
        })
    }, [])

    const onSubmit: SubmitHandler<ISignInForm> = (data) => {
        axios.post('http://localhost:8000/api/login', {
            name: data.login,
            password: data.password,
        }).then((response) => {
            if (response.status === 200) {
                console.log('Успех')
                navigate('/')
            } else {
                console.log('не успех')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    
    return (
        <>
            <Container maxWidth="xs" className='center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={3} justifyContent="center">
                        <Typography variant='h4' sx={{mb: 4}}>
                            Login
                        </Typography>
                        <Controller
                            control={ control }
                            name="login"
                            rules={loginValidation}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    label="Login"
                                    variant="outlined"
                                    onChange={(e) => field.onChange(e)}
                                    value={ field.value || "" }
                                    error={ !!errors.login?.message }
                                    helperText={ errors.login?.message }
                                />
                            )} 
                        />
                        <Controller
                            control={ control }
                            name="password"
                            rules={passwordValidation}
                            render={({ field }) => (
                                <TextField
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={(e) => field.onChange(e)}
                                    value={ field.value || "" }
                                    error={ !!errors.password?.message }
                                    helperText={ errors.password?.message }
                                />
                            )} 
                        />
                        <Stack direction="row" justifyContent="space-between" component="a">
                            <Typography variant='h6'>
                                Do not have account?
                            </Typography>
                            <Link to="/register">SignUp</Link>
                        </Stack> 
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </Stack>
                </form>
            </Container>    
        </>
    )
}