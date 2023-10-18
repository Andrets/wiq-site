import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './login_form/Login';
import { CreateOrder } from './create_order/CreateOrder';
import { Register } from './regiser_form/Register';
import { Homepage } from './home_page/Homepage';
import { MyOrders } from './MyOrders/MyOrders';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create-order" element={<CreateOrder />}  />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/myorders" element={<MyOrders />} />
            </Routes>
        </Router>
    )
}

export default App;