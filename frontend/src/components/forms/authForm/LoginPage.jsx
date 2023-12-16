import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../redux/reducers/authReducer';
import '../../forms/form.css';
import SubmitButton from '../../submitButton/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import AnimatePage from '../../AnimatePage';

export default function LoginPage() {
    const [loginUserData, setLoginUserData] = useState({});
    const dispatch = useDispatch();
    const { status, loginError } = useSelector((state) => state.user);
    let navigate = useNavigate()

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(userLogin(loginUserData));
        console.log(data?.payload?.token);
        if (typeof data?.payload?.token === 'string') {
            window.localStorage.setItem('token', data?.payload?.token);
        }
        if (status === 'resolved') {
            navigate("/");
        }
    };

    return (
        <AnimatePage>
            <div className='form-page' >
                <form className='form-page__form' onSubmit={handleUserLogin}>
                    <h3 className='form-page__form-name'>Войти</h3>
                    <input className='form-page__form-input' type="text" placeholder='Маил' onChange={(e) => setLoginUserData({ ...loginUserData, email: e.target.value })} />
                    <input className='form-page__form-input' type="password" placeholder='Пароль' onChange={(e) => setLoginUserData({ ...loginUserData, password: e.target.value })} />
                    <SubmitButton text='Войти' status={status} />
                    {loginError?.message && (<motion.p className='form-page__form-error' initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>{loginError?.message}</motion.p>)}
                    <Link className='form-page__form-back-btn-link-to-register' to='/register-page'>У меня нет аккаунта</Link>
                    <Link className='form-page__form-back-btn' to='/' >Назад  </Link>
                </form>
            </div>
        </AnimatePage>
    );
}
