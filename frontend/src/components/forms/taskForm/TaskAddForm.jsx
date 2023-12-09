import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Modal from '../../modal/Modal';
import { submitTask } from '../../../redux/reducers/todoSlicer';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import '../../forms/form.css';
import FormErrors from '../FormErrors';
import Tags from './Tags';
import SubmitButton from '../../submitButton/SubmitButton';
export default function TaskAddForm() {
    let dispatch = useDispatch();
    let { error, status } = useSelector(state => state.todo)
    let { room } = useSelector(state => state.room)
    let [openTaskAdd, setOpenTaskAdd] = useState(false)
    let [tags, setTags] = useState([])
    let [tag, setTag] = useState('')
    let [task, setTask] = useState({ room: { id: room._id } });
    let [disabled, setDisabled] = useState(false)


    useEffect(() => {
        setTask({ ...task, tags: tags });
        tags.length === 5 ? setDisabled(true) : setDisabled(false)
    }, [tags]);

    let addTag = (e) => {
        e.preventDefault()
        const newTag = { tag, id: Date.now() };
        setTags([...tags, newTag])
        setTag(' ')
    }

    let removeTag = (e) => {
        setTags(tags.filter((tag) => tag.id !== e))
    }
    let hanldeTask = async (e) => {
        e.preventDefault();
        if (room) {
            await dispatch(submitTask(task));
            await dispatch(getRoom(room.name));
            await setTags([])
        }
        if (!error) {
            setTask({ ...task, text: ' ' });
            setOpenTaskAdd(false)
        }
    }

    return (
        <div className='form'>
            <h2 className='form__modal-open' onClick={() => setOpenTaskAdd(true)}>Создать</h2>
            <Modal open={openTaskAdd} setOpen={setOpenTaskAdd} status={status}>
                <form className='form__container' onSubmit={hanldeTask} >
                    <h3 className='form__name'>Создать задачу</h3>
                    <input className='form__input' placeholder='Текст' maxLength="50" value={task.text} onChange={(e) => setTask({ ...task, text: e.target.value })} />
                    <input className='form__input' type="text" placeholder='Тег' value={tag} maxLength="20" onChange={(e) => setTag(e.target.value)} />
                    {tags?.length > 0 && (<Tags tags={tags} removeTag={removeTag} />)}
                    <span className={disabled ? 'form__btn-tag __form__btn-tag-disabled' : 'form__btn-tag'} onClick={addTag} >Добавить тег</span>
                    <SubmitButton status={status} text={'Добавить'} />
                    <FormErrors error={error} />
                </form>
            </Modal >
        </div >
    )
}
