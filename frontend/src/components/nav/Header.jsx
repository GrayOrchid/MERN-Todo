import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nav.css'
import { FaReact } from "react-icons/fa";
import { getMe, selectIsAuth } from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';
import NavAuth from './NavAuth';
// import Title from '../title/Title';
import User from './User';
export default function Header() {
    let dispatch = useDispatch()
    let isAuth = useSelector(selectIsAuth)
    let token = window.localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            dispatch(getMe())
        }
    }, []);

    return (
        <header className='header'>
            <header className='header__nav'>
                <Link className='header__nav-logo ' to={'/'}>
                    <FaReact className='header__nav-logo-icon nav-auth__icon' />
                    {/* <Title /> */}
                </Link>
                {isAuth ? <User /> : <NavAuth />}
            </header>
        </header >
    )
}
