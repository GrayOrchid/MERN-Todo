import React, { useEffect, useState } from 'react';
import '../../forms/form.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import Select from './Select';
import SubmitButton from '../../submitButton/SubmitButton';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function GetRoom() {
    let [storedOptions, setStoredOptions] = useState([]);
    let [selectedRoom, setSelectedRoom] = useState('');
    let dispatch = useDispatch();
    let { status, room } = useSelector(state => state.room);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    let navigate = useNavigate();

    useEffect(() => {
        const optionsFromLocalStorage = JSON.parse(window.localStorage.getItem('options'));
        if (optionsFromLocalStorage && optionsFromLocalStorage.length > 0) {
            setStoredOptions(optionsFromLocalStorage);
            setSelectedRoom(optionsFromLocalStorage[optionsFromLocalStorage.length - 1]);
        }
    }, []);

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    let handleRoom = () => {
        dispatch(getRoom(selectedRoom));
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate(`/room/${room.name}`);
        }
    }, [status, room.name, navigate]);

    return (
        <div className='form'>
            <h3 className='form__title'>Найти Комнату</h3>
            <form className='form__form' onSubmit={handleSubmit(handleRoom)}>
                <TextField
                    className='form__input'
                    sx={{ marginBottom: '20px' }}
                    error={Boolean(errors.name?.message)}
                    type='text'
                    {...register('roomName')}
                    placeholder='Введите название'
                    autoComplete='off'
                    value={selectedRoom}
                    variant="outlined"
                    onChange={handleRoomChange}
                    helperText={errors?.name?.message}
                />
                {storedOptions.length > 0 && (
                    <Select
                        storedOptions={storedOptions}
                        setStoredOptions={setStoredOptions}
                        setSelectedRoom={setSelectedRoom}
                    />
                )}
                <SubmitButton text={'Войти'} status={status} />
                <Link className='form-page__form-link' to={'/create-room'}>Создать</Link>
            </form>
        </div>
    );
}
