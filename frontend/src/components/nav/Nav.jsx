import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nav.css'
import { FaReact } from "react-icons/fa";
import User from '../user/User'
import { getMe, selectIsAuth } from '../../redux/reducers/authReducer';
import { Link, useLocation } from 'react-router-dom';
import NavAuth from './NavAuth';
import { motion } from 'framer-motion'
import Title from '../title/Title';
export default function Nav() {
    let dispatch = useDispatch()
    let isAuth = useSelector(selectIsAuth)
    let { room } = useSelector((state) => (state.room))
    let token = window.localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            dispatch(getMe())
        }
    }, []);
    let location = useLocation()
    return (
        <header className='header'>
            <header className='header__nav'>
                <Link className='header__nav-logo ' to={'/'}>
                    <FaReact className='header__nav-logo-icon nav-auth__icon' />
                    <Title />
                </Link>
                <NavAuth />
            </header>
        </header >
    )
}

{/* <div className="nav__auth">
                {isAuth ? <User /> :
                    <div className='nav__auth-btns'>
                        <h3 className='nav__auth-btn'><Link className='nav__auth-btn-link' to='/login-page'> Войти</Link> </h3>
                        <h3 className='nav__auth-btn'><Link className='nav__auth-btn-link' to='/register-page'> Регистрация</Link> </h3>
                    </div >
                }
            </div > */}




{/* <div className='nav'>
<div className="nav__auth">
    {isAuth ? <User /> :
        <div className='nav__auth-btns'>
            <UserRegisterForm />
            <LoginForm />
        </div >
    }
</div>
<div className='nav__room'>
    {room?.name &&
        (<div className='nav__room-items'>
            <h1 className='nav__room-name'>{room?.name}</h1>
            <p className='nav__room-leave' onClick={() => dispatch(leave())}>Выйти</p>
        </div>)
    }
    {isAuth && !room?.name && (
        <div className='nav__room-btns'>
            <CreateRoom />
            <GetRoom />
        </div>
    )}
</div>
</div > */}