import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';

export default function App() {
    return (
        <>
            <div className='center'>
                <SignUp />
            </div>
        </>
    )
}

const appDiv = document.getElementById('app');
const root = createRoot(appDiv)
root.render(<App tab="home"/>)