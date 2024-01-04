import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignIn } from '../../../redux/reducers/authReducer';
import '../../forms/form.css';
import gradientsArray from '../../../gradients';
import SubmitButton from '../../submitButton/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormErrors from '../FormErrors'
export default function UserRegisterForm() {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { status, registerError } = useSelector((state) => state.user);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onChange' })

    const handleUserRegister = async (UserData) => {
        const random = Math.floor(Math.random() * gradientsArray.length);
        const gradient = gradientsArray[random].colors.toString();

        const data = await dispatch(userSignIn({
            ...UserData,
            gradient: gradient,
        }));
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
        <div className='form'>
            <h3 className='form__title'>Регистрация</h3>
            <form className='form__form' onSubmit={handleSubmit(handleUserRegister)} >
                <TextField sx={{ marginBottom: '20px' }} error={Boolean(errors.email?.message)} label="Маил" variant="outlined"  {...register('email', { required: 'Укажите почту', })} autoComplete="off" helperText={errors?.email?.message} />
                <TextField sx={{ marginBottom: '20px' }} error={Boolean(errors.userName?.message)} label="Имя пользователя" variant="outlined"  {...register('userName', {
                    required: 'Укажите Имя польвателя',
                    pattern: {
                        value: /^(?!\s+$).+$/,
                        message: 'Недопустимое имя пользоватея',
                    },

                })} placeholder="Введите Имя" autoComplete="off" helperText={errors?.userName?.message} />
                <TextField sx={{ marginBottom: '20px' }} type='password' error={Boolean(errors.password?.message)} label="Пароль" variant="outlined" {...register('password', {
                    required: 'Укажите пароль',
                    pattern: {
                        value: /^(?!\s+$).+$/,
                        message: 'Недопустимый пароль',
                    },
                })} placeholder="Введите пароль" autoComplete="off" helperText={errors?.password?.message} />
                {registerError && (
                    <FormErrors error={registerError} />
                )}
                <SubmitButton text={'Создать'} />
            </form>
            <Link className='form-page__form-link' to='/login-page'>У меня есть аккаунт</Link>
            <Link className='form-page__form-link' to='/' >Назад  </Link>
        </div>
    );
}
