import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SubmitButton from '../../submitButton/SubmitButton';
import { addOption, createRoom } from '../../../redux/reducers/roomSlicer';
import Form from '../Form';

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
                {...register('name', {
                    required: 'Введите название',
                    pattern: {
                        value: /^(?!\s+$).+$/,
                        message: 'Недопустимое название',
                    },
                    maxLength: {
                        value: 20,
                        message: 'Максимальное значение 15',
                    },
                })}
                autoComplete="off"
                helperText={errors?.name?.message}
            />
            <SubmitButton status={status} text={'Создать'} />
            <Link className='form-page__form-link' to={'/get-room'}>Найти</Link>
        </Form>
    );
}
