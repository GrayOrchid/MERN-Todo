import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nav.css'
import GetRoom from '../forms/roomForms/GetRoom';
import CreateRoom from '../forms/roomForms/CreateRoom';
import LoginForm from '../forms/authForm/LoginForm'
import UserRegisterForm from '../forms/authForm/UserRegisterForm'
import User from '../user/User'
import { getMe, selectIsAuth } from '../../redux/reducers/authReducer';
import { leave } from '../../redux/reducers/roomSlicer';

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
        </div >
    )
}



