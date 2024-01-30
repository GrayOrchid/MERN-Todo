import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './header.css'
import { FaReact } from "react-icons/fa";
import { getMe, selectIsAuth } from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';
import NavAuth from './NavAuth';
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
            <nav className='header__nav'>
                <Link className='header__nav-logo' style={{ fontSize: '1.5rem' }} to={'/'}>
                    <FaReact className='header__nav-logo-icon nav-auth__icon' />
                    <span className='header__nav-logo-text'> React Todo</span>
                </Link>
                {isAuth ? <User /> : <NavAuth />}
            </nav>
        </header >
    )
}
