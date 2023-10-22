import React, { FC } from 'react';
import { Login } from './login_form/Login';
import { CreateOrder } from './create_order/CreateOrder';
import { Register } from './regiser_form/Register';
import { Homepage } from './home_page/Homepage';
import { MyOrders } from './MyOrders/MyOrders';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/create-order' element={<CreateOrder />} />
                <Route path='/myorders' element={<MyOrders />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App;