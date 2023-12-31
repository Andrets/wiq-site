import React, { FC, useEffect, useState } from 'react';
import { Box, Container, TextField, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
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
        fetch('/api/checkuser')
        .then((response) => {
            if (response.status === 200) {
                navigate('/')
            } else {
                null
            }
        })
    }, [])

    const onSubmit: SubmitHandler<ISignInForm> = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.login,
                password: data.password,
            })
        };
        fetch('/api/login', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                .then((data) => {
                    navigate('/')
                })
            } else {
                null
            }
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
                            <a href="/register">SignUp</a>
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