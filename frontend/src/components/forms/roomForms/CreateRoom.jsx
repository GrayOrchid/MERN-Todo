import React, { useEffect } from 'react'
import '../../forms/form.css';
import { useDispatch, useSelector } from 'react-redux'
import { addOption, createRoom } from '../../../redux/reducers/roomSlicer'
import SubmitButton from '../../submitButton/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export default function CreateRoom() {
<<<<<<< Updated upstream
    let [openCreateRoom, setOpenCreateRoom] = useState(false)
    let [roomData, setRoomData] = useState('')
    let [disabled, setDisabled] = useState(false)
    let dispatch = useDispatch()
    let { error, status } = useSelector((state) => state.room);
=======
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const spacesRegex = /^\s*$/
    const { status, room } = useSelector((state) => state.room);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onChange' })
>>>>>>> Stashed changes

    let handleRoom = (roomData) => {
        dispatch(createRoom(`${roomData.name} - ${Math.floor(Math.random() * 1000)}`));
    }
    useEffect(() => {
        if (status === 'resolved') {
            navigate(`/room/${room.name}`);
            dispatch(addOption)
        }
    }, [status]);



    return (
        <div className='form'>
<<<<<<< Updated upstream
            <button className='room-modal__open' onClick={() => setOpenCreateRoom(true)}>Создать Комнату</button>
            <Modal open={openCreateRoom} setOpen={setOpenCreateRoom}>
                <form className='form__container' onSubmit={handleRoom} >
                    <h3 className='form__name'>Создать Комнату</h3>
                    <input className='form__input' placeholder='Room Name' maxLength="20" type="text" onChange={(e) => setRoomData(e.target.value)} />
                    <SubmitButton status={status} disabled={disabled} text='Создать' />
                </form>
            </Modal>
=======
            <h3 className='form__title'>Создать</h3>
            <form className='form__form' onSubmit={handleSubmit(handleRoom)} >
                <TextField sx={{ marginBottom: '20px' }} error={Boolean(errors.name?.message)}
                    label="Введите название" variant="outlined"
                    {...register('name', {
                        required: 'Введите название',
                        pattern: {
                            value: /^(?!\s+$).+$/,
                            message: 'Недопустимое название',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Максимальное значеие 15'
                        }
                    })}
                    autoComplete="off"
                    helperText={errors?.name?.message} />
                <SubmitButton status={status} text={'Создать'} />
                <Link className='form-page__form-link' to={'/get-room'}>Найти</Link>
            </form>
>>>>>>> Stashed changes
        </div>
    )
}
