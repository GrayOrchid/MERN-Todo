import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import '../../forms/form.css';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import Select from './Select';
import SubmitButton from '../../submitButton/SubmitButton';
import Form from '../Form';

export default function GetRoom() {
    const [storedOptions, setStoredOptions] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const dispatch = useDispatch();
    const { status, room, error } = useSelector(state => state.room);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

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

    const handleRoom = () => {
        dispatch(getRoom(selectedRoom));
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate(`/room/${room.name}`);
        }
    }, [status, room.name, navigate]);

    return (
        <Form title='Найти Комнату' submit={handleSubmit(handleRoom)} error={error}>
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
        </Form>
    );
}
