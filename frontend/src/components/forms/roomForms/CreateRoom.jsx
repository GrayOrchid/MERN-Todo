import React, { useEffect, useState } from 'react'
import '../../forms/form.css';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../modal/Modal'
import { createRoom, getRoom } from '../../../redux/reducers/roomSlicer'
import SubmitButton from '../../submitButton/SubmitButton';



export default function CreateRoom() {
    let [roomData, setRoomData] = useState('')
    let [disabled, setDisabled] = useState(false)
    let dispatch = useDispatch()
    let { error, status } = useSelector((state) => state.room);

    useEffect(() => {
        const containsOnlySpaces = /^\s*$/.test(roomData);
        setDisabled(containsOnlySpaces);
    }, [roomData]);

    let handleRoom = async (e) => {
        e.preventDefault();
        const fullRoomName = `${roomData} #${Math.floor(Math.random() * 1000)}`;
        await dispatch(createRoom(fullRoomName));
        await dispatch(getRoom(fullRoomName));
        return error;
    }

    return (
        <div className='form'>
            <form className='form__container' onSubmit={handleRoom} >
                <h3 className='form__name'>Создать Комнату</h3>
                <input className='form__input' placeholder='Room Name' maxLength="20" type="text" onChange={(e) => setRoomData(e.target.value)} />
                <SubmitButton status={status} disabled={disabled} text='Создать' />
            </form>
        </div>
    )
}
