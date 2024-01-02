import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { logout } from '../../redux/reducers/authReducer';
import { leave } from '../../redux/reducers/roomSlicer';
import { Link, useNavigate } from 'react-router-dom';

export default function User() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [anchorEl, setAnchorEl] = useState(null);
    let navigate = useNavigate()
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const userLogout = () => {
        dispatch(logout());
        dispatch(leave());
        navigate('/')
    };

    return (
        <div>
            <IconButton onClick={handleOpenMenu}>
                <div className="nav-user__color" style={{ background: `linear-gradient(to bottom, ${user?.color})` }}>{user?.userName.charAt(0)}</div>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem>
                    {user?.userName}
                </MenuItem>
                <MenuItem onClick={userLogout}>
                    <Link to="/">
                        Выйти
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
