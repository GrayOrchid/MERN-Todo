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
<<<<<<< Updated upstream
    let [openGetRoom, setOpenGetRoom] = useState(false)
    let [storedOptions, setStoredOptions] = useState([])
    let [disabled, setDisabled] = useState(false)
    let [roomData, setRoomData] = useState('')
    let dispatch = useDispatch()
    let { error, status } = useSelector(state => state.room)
=======
    let [storedOptions, setStoredOptions] = useState([]);
    let [selectedRoom, setSelectedRoom] = useState('');
    let dispatch = useDispatch();
    let { status, room } = useSelector(state => state.room);
    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <button className='room-modal__open' onClick={() => setOpenGetRoom(true)}>Найти Комнату</button>
            <Modal open={openGetRoom} setOpen={setOpenGetRoom}>
                <form className='form__container' onSubmit={handleRoom} >
                    <h3 className='form__name'>Найти Комнату</h3>
                    <input className='form__input' type="text" placeholder='Введите название комнаты' maxLength="20" value={roomData} onChange={(e) => setRoomData(e.target.value)} />
                    {storedOptions?.length > 0 && (
                        <Select roomData={roomData} setRoomData={setRoomData} storedOptions={storedOptions} setStoredOptions={setStoredOptions} />
                    )}
                    <SubmitButton status={status} text={'Войти'} />
                    <FormErrors error={error} />
                </form>
            </Modal>
=======
            <h3 className='form__title'>Найти Комнату</h3>
            <form className='form__form' onSubmit={handleSubmit(handleRoom)}>
                <TextField
                    className='form__input'
                    type='text'
                    {...register('roomName')}
                    placeholder='Введите название'
                    autoComplete='off'
                    value={selectedRoom}
                    onChange={handleRoomChange}
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
>>>>>>> Stashed changes
        </div>
    );
}
