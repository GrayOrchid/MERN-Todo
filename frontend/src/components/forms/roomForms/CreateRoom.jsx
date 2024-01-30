import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOption, createRoom } from '../../../redux/reducers/roomSlicer';
import SubmitButton from '../../UiComponents/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Form from '../Form';
import { RoomValidation } from '../../../utils/RulesForClientValidation';

export default function CreateRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, room, error } = useSelector((state) => state.room);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    const handleRoom = (roomData) => {
        dispatch(createRoom(`${roomData.name} - ${Math.floor(Math.random() * 1000)}`));
    };

    useEffect(() => {
        if (status === 'resolved') {
            navigate(`/room/${room.name}`);
            dispatch(addOption);
        }
    }, [status]);

    return (
        <Form title='Создать' submit={handleSubmit(handleRoom)} error={error}>
            <TextField
                sx={{ marginBottom: '20px' }}
                error={Boolean(errors.name?.message)}
                label="Введите название"
                variant="outlined"
                {...register('name', RoomValidation)}
                autoComplete="off"
                helperText={errors?.name?.message}
            />
            <SubmitButton status={status} text={'Создать'} />
            <Link className='form-page__form-link' to={'/get-room'}>Найти</Link>
        </Form>
    );
}
