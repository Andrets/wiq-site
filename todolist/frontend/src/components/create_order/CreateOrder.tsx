import React, { FC, useState, useEffect } from 'react';
import { Container, Stack, Button, Typography, FormControl, MenuItem, InputLabel, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from '../theme/ThemeContextProvider';
import Select from "react-select";
import { linkValidation } from './validation';
import NightModeToggle from '../theme/NightModeToggle';


interface IFormOrder {
    service: {value: number; label: string};
    quantity: number;
    nickname: string;
}

interface Services {
    id: number,
    service: number,
    category: number,
    name: string,
    cost: string,
    rate: string,
    min: number,
    max: number,
    refill: boolean,
    cancel: boolean,
    type: string,
    dripfeed: boolean,
}

export const CreateOrder:FC = () => {
    const navigate = useNavigate()
    const {theme} = useThemeContext()
    const [services, setServices] = useState<Services[]>([])
    const { handleSubmit, control } = useForm<IFormOrder>()
    const { errors } = useFormState({
        control
    })

    useEffect(() => {
        fetch('/api/wiq/insta-services')
        .then((response) => {
            if (response.status === 200) {
                response.json()
                .then((data) => {
                    setServices(data)
                })
            }
        })
    }, [])
    
    const onSubmit: SubmitHandler<IFormOrder> = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service: data.service.value,
                quantity: data.quantity,
                nickname: data.nickname,
            })
        }
        fetch('/api/wiq/create-order', requestOptions)
        .then((response) => {
            if (response.status === 201) {
                navigate('/myorders')
            } else {
                null
            }
        })
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <NightModeToggle />
            <Container maxWidth="sm" className='center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={12} justifyContent="center">
                        <FormControl sx={{gap: 5}}>
                            <Controller
                                name='service'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={ field.value || "" }
                                        options={services.map((service) => ({
                                            value: service.id,
                                            label: service.name
                                        }))}
                                    />
                                )}
                            />
                            <Controller
                                name="quantity"
                                control={ control }
                                render={({ field }) => (
                                    <TextField
                                        type="number"
                                        onChange={(e) => field.onChange(e)}
                                        label="Enter a quanitity"
                                        variant='outlined'
                                        value={ field.value || "" }
                                        error={ !!errors.quantity?.message}
                                        helperText={ errors.quantity?.message}
                                    />
                                )} 
                             />
                             <Controller
                                name="nickname"
                                control={ control }
                                rules={linkValidation}
                                render={({ field }) => (
                                    <TextField
                                        type="text"
                                        onChange={(e) => field.onChange(e)}
                                        label="Enter instagram nick"
                                        variant='outlined'
                                        value={ field.value || "" }
                                        error={ !!errors.nickname?.message}
                                        helperText={ errors.nickname?.message}
                                    />
                                )} 
                             />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Create an order 
                        </Button>
                    </Stack>
                </form>
            </Container>
            </CssBaseline>
        </ThemeProvider>
        </>
    )
}
