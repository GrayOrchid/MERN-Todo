import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userSignIn } from '../../../redux/reducers/authReducer';
import '../../forms/form.css';
import FormErrors from '../FormErrors';
import gradientsArray from '../../../gradients';
import SubmitButton from '../../submitButton/SubmitButton';

export default function UserRegisterForm() {
    const [openUserRegister, setOpenUserRegister] = useState(false);
    const [registerUserData, setRegisterUserData] = useState({});
    const dispatch = useDispatch();
    const { status, registerError } = useSelector((state) => state.user);
    const handleUserRegister = async (e) => {
        const random = Math.floor(Math.random() * gradientsArray.length);
        const gradient = gradientsArray[random].colors.toString();

        e.preventDefault();
        const data = await dispatch(userSignIn({
            ...registerUserData,
            gradient: gradient,
        }));
        if (typeof data?.payload?.token === 'string') {
            window.localStorage.setItem('token', data?.payload?.token);
        }
    };

    return (
        <div className='form'>
            <h3 className='form__modal-open' onClick={() => setOpenUserRegister(true)}>Регистрация</h3>
            <Modal open={openUserRegister} setOpen={setOpenUserRegister}>
                <form className='form__container' onSubmit={handleUserRegister}>
                    <h3 className='form__name'>Регистрация</h3>
                    <input className='form__input' type="text" placeholder='email' onChange={(e) => setRegisterUserData({ ...registerUserData, email: e.target.value })} />
                    <input className='form__input' type="text" placeholder='user name' onChange={(e) => setRegisterUserData({ ...registerUserData, userName: e.target.value })} />
                    <input className='form__input' type="text" placeholder='password' onChange={(e) => setRegisterUserData({ ...registerUserData, password: e.target.value })} />
                    <SubmitButton status={status} text='Регистрация' />
                    <FormErrors error={registerError} />
                    <p className='form__error'>{registerError?.message}</p>
                </form>
            </Modal>
        </div>
    );
}
