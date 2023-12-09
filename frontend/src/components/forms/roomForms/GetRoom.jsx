import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import '../../forms/form.css';
import { useDispatch, useSelector } from 'react-redux'
import { getRoom } from '../../../redux/reducers/roomSlicer'
import FormErrors from '../FormErrors';
import Select from './Select';
import SubmitButton from '../../submitButton/SubmitButton';


export default function GetRoom() {
    let [openGetRoom, setOpenGetRoom] = useState(false)
    let [storedOptions, setStoredOptions] = useState([])
    let [disabled, setDisabled] = useState(false)
    let [roomData, setRoomData] = useState('')
    let dispatch = useDispatch()
    let { error, status } = useSelector(state => state.room)

    useEffect(() => {
        const containsOnlySpaces = /^\s*$/.test(roomData);
        setDisabled(containsOnlySpaces);
    }, [roomData]);

    useEffect(() => {
        const optionsFromLocalStorage = JSON.parse(window.localStorage.getItem("options"));
        if (optionsFromLocalStorage && optionsFromLocalStorage.length > 0) {
            setStoredOptions(optionsFromLocalStorage);
            setRoomData(optionsFromLocalStorage[optionsFromLocalStorage.length - 1]);
        }
    }, []);

    let handleRoom = async (e) => {
        e.preventDefault()
        await dispatch(getRoom(roomData))
        return error
    }

    return (
        <div className='form'>
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
        </div>
    )
}


