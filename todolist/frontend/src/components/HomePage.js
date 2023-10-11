import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, Container, Button, ButtonGroup, Grid, Stack, Radio, FormControl, FormControlLabel, RadioGroup, FormLabel, Snackbar, Alert, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function HomePage() {
    const [checktoken, setChecktoken] = useState(false);
    const [auth, setAuth] = useState(false);
    const [statusOpen, setStatusOpen] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState('');
    const [priority, setPriority] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate()

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${Cookies.get('token')}`,
            },
        };
        fetch('/api/check', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                setAuth(true);
                console.log('успех')
            } else {
                navigate('/login')
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }, []);

    const handleLogOut = () => {
        fetch('/api/logout')
        .then((response) => {
            if (response.ok) {
                Cookies.remove('token');
                navigate('/login')
                console.log('Вышли успешно')
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }
    const OnSubmit = (event) => {
        event.preventDefault()
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    function handleSubmitForm(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Token ${Cookies.get('token')}` 
            },
            body: JSON.stringify({
                title: title,
                description: description,
                due_date: due_date,
                priority: priority,
            })
        }
        fetch('/api/create-task', requestOptions)
        .then((response) => {
            if (response.status === 201) {
                setMessage({
                    message: "Task successfully created!"
                });
                setSnackbarSeverity('success');
                setOpen(true);
            } else {
                setMessage({
                    message: "Incorrect data!"
                });
                setSnackbarSeverity('error');
                setOpen(true);
            }
        })
    }
    const handleDueDateChange = (event) => {
        setDue_date(event)
    }
    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickway') {
            return;
        }
        setOpen(false);
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        }
    })

    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>  
                <CssBaseline>  
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography component="a" href="/" sx={{ml: 2, textDecoration: 'none', fontWeight: 700}}>
                                TO DO LIST
                            </Typography>
                            <ButtonGroup sx={{ml: 'auto', mr: 2}}>
                                <Button variant="text" onClick={handleLogOut} color="warning">
                                    Logout
                                </Button>
                                <Button variant="text" to="/profile" component={Link} color="warning">
                                    Profile
                                </Button>
                            </ButtonGroup>
                        </Toolbar>
                    </AppBar>
                    <form onSubmit={OnSubmit} className="center">
                        <h2>Create Task</h2>
                        <Stack spacing={2} direction='column' sx={{mb: 4, minWidth: 400}}>
                            <TextField 
                                type="text"
                                variant="outlined"
                                color="primary"
                                label="title"
                                onChange={handleTitleChange}
                                value={title}
                                fullWidth
                                required
                            />
                            <TextField 
                                type="text"
                                variant="outlined"
                                color="warning"
                                label="description"
                                onChange={handleDescriptionChange}
                                value={description}
                                fullWidth
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={handleDueDateChange} format="YYYY-MM-DD" />
                            </LocalizationProvider>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Priority
                                </FormLabel>
                                <RadioGroup row onChange={handlePriorityChange}>
                                    <FormControlLabel value="low" control={<Radio />} label="Low" labelPlacement="bottom" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" labelPlacement="bottom" />
                                    <FormControlLabel value="high" control={<Radio />} label="High" labelPlacement="bottom" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" onClick={handleSubmitForm}>  
                                    Create task
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbarSeverity}>
                            {message && message.message}
                        </Alert>
                    </Snackbar>
                </CssBaseline>
            </ThemeProvider>        
        </React.Fragment>
    )
}