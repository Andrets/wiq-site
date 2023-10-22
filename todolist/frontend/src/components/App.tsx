import React, { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Route, Routes, BrowserRouter as BrowserRouter } from "react-router-dom";
import { Login } from './login_form/Login';
import { CreateOrder } from './create_order/CreateOrder';
import { Register } from './regiser_form/Register';
import { Homepage } from './home_page/Homepage';
import { MyOrders } from './MyOrders/MyOrders';
import { ErrorPage } from './ErrorPage/ErrorPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="login/" element={<ErrorPage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;