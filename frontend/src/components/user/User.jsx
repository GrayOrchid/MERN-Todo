import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/reducers/authReducer';
import './user.css'
import { leave } from '../../redux/reducers/roomSlicer';
export default function User() {
    let dispatch = useDispatch()
    const user = useSelector((state) => state.user.data);

    const userLogout = () => {
        dispatch(logout())
        dispatch(leave())
    }
    return (
        <div className='user'>
            <div className='user__color' style={{ background: `linear-gradient(to bottom, ${user?.color})` }}>{user?.userName.charAt(0)}</div>
            <h4 className='user__name'>{user?.userName}</h4>
            <h3 className='user__logout' onClick={userLogout}>Выйти</h3>
        </div >
    )
}
