import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import HomePage from './HomePage';

export default function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/signup' element = {
                            <div className='center'>
                                <SignUp />
                            </div>
                        } />
                        <Route path='/login' element = {
                            <div>
                                <Login />
                            </div>
                        } />
                        <Route exact path='/' element={<HomePage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

const appDiv = document.getElementById('app');
const root = createRoot(appDiv)
root.render(<App tab="home"/>)