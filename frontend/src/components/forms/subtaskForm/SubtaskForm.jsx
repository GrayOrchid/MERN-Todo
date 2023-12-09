import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOne } from '../../../redux/reducers/todoSlicer';
import { submitSubtask } from '../../../redux/reducers/subtaskSlicer';
import Modal from '../../modal/Modal';

export default function SubtaskForm({ _id }) {
    let { error } = useSelector(state => state.subtask)
    let [subtaskData, setSubtaskData] = useState({ taskId: _id })
    let [openSubtask, setOpenSubtask] = useState(false)
    let dispatch = useDispatch()
    const handleSubmitSubtaskData = async (e) => {
        e.preventDefault();
        await dispatch(submitSubtask(subtaskData))
        await dispatch(getOne(_id))

        if (!error) {
            setSubtaskData({ ...subtaskData, text: ' ' })
            setOpenSubtask(false)
        }
    };
    return (
        <div className='form'>
            <h2 className='form__modal-open' onClick={() => setOpenSubtask(true)}>Добавить подздачу</h2>
            <Modal open={openSubtask} setOpen={setOpenSubtask}>
                <form className='form__container' onSubmit={handleSubmitSubtaskData}>
                    <h3 className='form__name'>Добавить подздачу</h3>
                    <input className='form__input' placeholder='текст' value={subtaskData.text} type="text" onChange={(e) => setSubtaskData({ ...subtaskData, text: e.target.value })} />
                    <button className='form__btn' type="submit">Добавить</button>
                </form>
            </Modal>
        </div>
    )
}
