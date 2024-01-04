import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nav.css'
import User from '../user/User'
import { getMe, selectIsAuth } from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';

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

    return (
        <div className='nav'>
            <div className="nav__auth">
                {isAuth ? <User /> :
                    <div className='nav__auth-btns'>
                        <h3 className='nav__auth-btn'><Link className='nav__auth-btn-link' to='/login-page'> Войти</Link> </h3>
                        <h3 className='nav__auth-btn'><Link className='nav__auth-btn-link' to='/register-page'> Регистрация</Link> </h3>
                    </div >
                }
            </div >
        </div >
    )
}

