import React from "react";
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from './../pages/Home';
import Tour from '../pages/Tour';
import TourDetails from '../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";
import Payment from "../pages/Payment";
import { useCookies } from "react-cookie";

const Routers = () => {
    // Retrieve the cookies
    const [cookies] = useCookies(['email', 'password', 'token', 'uid']);

    // Access the cookie values
    const { email, password, token, uid } = cookies;
    return (
        <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/tours' element={<Tour/>} />
        <Route path='/tour/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/tour/search' element={<SearchResultList/>} />
        {token && <Route path='/tour/payment/:id' element={<Payment />} />}

        </Routes>
    )
}

export default Routers;