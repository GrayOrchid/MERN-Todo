import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../redux/reducers/authReducer';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormErrors from '../FormErrors';
import SubmitButton from '../../submitButton/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form';

export default function LoginForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const { status, loginError } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleUserLogin = async (userData) => {
        const data = await dispatch(userLogin(userData));
        if (typeof data?.payload?.token === 'string') {
            window.localStorage.setItem('token', data?.payload?.token);
        }
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate('/');
        }
    }, [status]);

    return (
        <Form title='Войти' submit={handleSubmit(handleUserLogin)} error={loginError}>
            <TextField sx={{ marginBottom: '20px' }} error={Boolean(errors.email?.message)} label="Маил" variant="outlined" {...register('email', { required: 'Укажите почту' })} autoComplete="off" helperText={errors?.email?.message} />
            <TextField sx={{ marginBottom: '20px' }} type='password' error={Boolean(errors.password?.message)} label="Пароль" variant="outlined" {...register('password', { required: 'Укажите пароль' })} placeholder="Введите пароль" autoComplete="off" helperText={errors?.password?.message} />
            {loginError && (
                <FormErrors error={loginError} />
            )}
            <SubmitButton text={'Войти'} />
            <Link className='form-page__form-link' to='/register-page'>У меня нет аккаунта</Link>
            <Link className='form-page__form-link' to='/'>Назад</Link>
        </Form>

    );
}
