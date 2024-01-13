import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SubmitButton from '../../submitButton/SubmitButton';
import { userSignIn } from '../../../redux/reducers/authReducer';
import gradientsArray from '../../../gradients';
import FormErrors from '../FormErrors';
import Form from '../Form';

export default function UserRegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, registerError } = useSelector((state) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    const handleUserRegister = async (userData) => {
        const random = Math.floor(Math.random() * gradientsArray.length);
        const gradient = gradientsArray[random].colors.toString();
        const data = await dispatch(userSignIn({
            ...userData,
            gradient: gradient,
        }));
        if (data?.payload?.token) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate('/');
        }
    }, [status]);

    return (
        <Form title='Регистрация' submit={handleSubmit(handleUserRegister)} error={registerError}>
            <TextField
                sx={{ marginBottom: '20px' }}
                error={Boolean(errors.email?.message)}
                label="Email"
                variant="outlined"
                {...register('email', { required: 'Please provide your email' })}
                autoComplete="off"
                helperText={errors?.email?.message}
            />
            <TextField
                sx={{ marginBottom: '20px' }}
                error={Boolean(errors.userName?.message)}
                label="Username"
                variant="outlined"
                {...register('userName', {
                    required: 'Please provide a username',
                    pattern: {
                        value: /^(?!\s+$).+$/,
                        message: 'Invalid username',
                    },
                })}
                placeholder="Enter your username"
                autoComplete="off"
                helperText={errors?.userName?.message}
            />
            <TextField
                sx={{ marginBottom: '20px' }}
                type='password'
                error={Boolean(errors.password?.message)}
                label="Password"
                variant="outlined"
                {...register('password', {
                    required: 'Please provide a password',
                    pattern: {
                        value: /^(?!\s+$).+$/,
                        message: 'Invalid password',
                    },
                })}
                placeholder="Enter your password"
                autoComplete="off"
                helperText={errors?.password?.message}
            />
            {registerError && <FormErrors error="Invalid registration data" />}
            <SubmitButton text={'Create Account'} />
            <Link className='form-page__form-link' to='/login-page'>Already have an account?</Link>
            <Link className='form-page__form-link' to='/'>Back</Link>
        </Form>
    );
}
