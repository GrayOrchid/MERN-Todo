import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavAuthGuest() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-label="user-menu" onClick={handleClick}>
                <FaRegUserCircle style={{ fontSize: '1.5rem' }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
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
                <MenuItem >
                    <Link to="/login-page" onClick={handleClose}>
                        Войти
                    </Link>
                </MenuItem>
                <MenuItem >
                    <Link to="/register-page" onClick={handleClose}>
                        Создать аккаунт
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
