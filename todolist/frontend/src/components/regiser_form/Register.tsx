import React, { FC, useState, useEffect } from 'react';
import { Container, Typography, Button, Stack, TextField } from "@mui/material";
import { useForm, useFormState, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { usernameValidation, passwordValidation, emailValidation } from './validation';

interface ISignUpForm {
    username: string,
    password: string,
    email: string,
}


export const Register:FC = () => {
    const { handleSubmit, control } = useForm<ISignUpForm>();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { errors } = useFormState({
        control
    })

    useEffect(() => {
        fetch('/api/checkuser')
        .then((response) => {
            if (response.ok) {
                navigate('/')
            } else {
                null
            }
        })
    }, [])

    const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.username,
                email: data.email,
                password: data.password,
            })
        }
        fetch('/api/register', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                navigate('/')
            } else {
                setError('Error while')
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    return (
        <>
            <Container maxWidth="xs" className='center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant='h4'>
                            Register
                        </Typography>
                        <Controller 
                            control={ control }
                            name="username"
                            rules={usernameValidation}
                            render={({ field }) => (
                                <TextField
                                    label="login"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => field.onChange(e) }
                                    value={ field.value || "" }
                                    error={ !!errors.username?.message }
                                    helperText={ errors.username?.message}
                                />
                            )}
                        />
                        <Controller 
                            control={ control }
                            name="email"
                            rules={emailValidation}
                            render={({ field }) => (
                                <TextField
                                    label="email"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => field.onChange(e) }
                                    value={ field.value || "" }
                                    error={ !!errors.email?.message }
                                    helperText={ errors.email?.message}
                                />
                            )}
                        />
                        <Controller 
                            control={ control }
                            name="password"
                            rules={passwordValidation}
                            render={({ field }) => (
                                <TextField
                                    label="password"
                                    variant="outlined"
                                    type="password"
                                    onChange={(e) => field.onChange(e) }
                                    value={ field.value || "" }
                                    error={ !!errors.password?.message }
                                    helperText={ errors.password?.message}
                                />
                            )}
                        />
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6"> 
                                Already have account?
                            </Typography>
                            <a href="/login">LogIn</a>
                        </Stack>
                        <Button variant="contained" type="submit">
                            Register
                        </Button>
                    </Stack>
                </form>
            </Container>
        </>
    )
}