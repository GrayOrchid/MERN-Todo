import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../redux/reducers/authReducer';
import '../../forms/form.css';
import SubmitButton from '../../submitButton/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream:frontend/src/components/forms/authForm/LoginPage.jsx
import { motion } from "framer-motion";
import AnimatePage from '../../AnimatePage';

export default function LoginPage() {
    const [loginUserData, setLoginUserData] = useState({});
=======
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormErrors from '../FormErrors';


export default function LoginForm() {
>>>>>>> Stashed changes:frontend/src/components/forms/authPages/LoginForm.jsx
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })
    const { status, loginError } = useSelector((state) => state.user);
    let navigate = useNavigate()
    const handleUserLogin = async (UserData) => {
        const data = await dispatch(userLogin(UserData));
        if (typeof data?.payload?.token === 'string') {
            window.localStorage.setItem('token', data?.payload?.token);
        }
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate("/");
        }
    }, [status]);


    return (
        <div className="form" >
            <h3 className='form__title'>Войти</h3>
            <form className='form__form' onSubmit={handleSubmit(handleUserLogin)} >
                <TextField sx={{ marginBottom: '20px' }} error={Boolean(errors.email?.message)} label="Маил" variant="outlined"  {...register('email', { required: 'Укажите почту' })} autoComplete="off" helperText={errors?.email?.message} />
                <TextField sx={{ marginBottom: '20px' }} type='password' error={Boolean(errors.password?.message)} label="Пароль" variant="outlined" {...register('password', { required: 'Укажите пароль' })} placeholder="Введите пароль" autoComplete="off" helperText={errors?.password?.message} />
                {loginError && (
                    <FormErrors error={loginError} />
                )}
                <SubmitButton text={'Войти'} />
            </form>
            <Link className='form-page__form-link' to='/register-page'>У меня нет аккаунта</Link>
            <Link className='form-page__form-link' to='/' >Назад  </Link>
        </div>
    );
}
