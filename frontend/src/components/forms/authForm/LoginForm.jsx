import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../redux/reducers/authReducer';
import '../../forms/form.css';
import SubmitButton from '../../submitButton/SubmitButton';

export default function LoginForm() {
    const [openLogin, setOpenLogin] = useState(false);
    const [loginUserData, setLoginUserData] = useState({});
    const dispatch = useDispatch();
    const { status, loginError } = useSelector((state) => state.user);

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(userLogin(loginUserData));
        if (typeof data?.payload?.token === 'string') {
            window.localStorage.setItem('token', data?.payload?.token);
        }
    };

    return (
        <div className='form'>
            <h3 className='form__modal-open' onClick={() => setOpenLogin(true)}>Войти</h3>
            <Modal open={openLogin} setOpen={setOpenLogin}>
                <form className='form__container' onSubmit={handleUserLogin}>
                    <h3 className='form__name'>Войти</h3>
                    <input className='form__input' type="text" placeholder='email' onChange={(e) => setLoginUserData({ ...loginUserData, email: e.target.value })} />
                    <input className='form__input' type="text" placeholder='password' onChange={(e) => setLoginUserData({ ...loginUserData, password: e.target.value })} />
                    <SubmitButton text='Войти' status={status} />
                    <p className='form__error'>{loginError?.message}</p>
                </form>
            </Modal>
        </div>
    );
}
