import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import AnimateSelect from '../animate/AnimateSelect';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoCaretDownSharp } from "react-icons/io5"
export default function NavAuth() {
    let [show, setShow] = useState(false)
    return (
        <div className="nav-auth">
            <div className="nav-auth__items" onClick={() => setShow(!show)}>
                <FaRegUserCircle className='nav-auth__user-icon nav-auth__icon' />
                <IoCaretDownSharp className='nav-auth__user-arrow' />
            </div>
            <AnimatePresence>
                {show && (
                    <AnimateSelect y={-10}>
                        <ul className="nav-auth__list" >
                            <li className='nav-auth__list-item'><Link className='nav-auth__list-link' to={'/login-page'}>Войти</Link></li>
                            <li className='nav-auth__list-item'><Link className='nav-auth__list-link' to={'/register-page'}>Регистрация</Link></li>
                        </ul>
                    </AnimateSelect>

                )}
            </AnimatePresence>
        </div >
    )
}
