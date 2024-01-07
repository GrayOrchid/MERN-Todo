import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Modal from '../../modal/Modal';
import { submitTask } from '../../../redux/reducers/todoSlicer';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import '../../forms/form.css';
import FormErrors from '../FormErrors';
import Tags from './Tags';
import SubmitButton from '../../submitButton/SubmitButton';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
export default function TaskAddForm() {
    let dispatch = useDispatch();
    let { error, status } = useSelector(state => state.todo)
    let { room } = useSelector(state => state.room)
    let [openTaskAdd, setOpenTaskAdd] = useState(false)
    let [tags, setTags] = useState([])
    let [tag, setTag] = useState('')
    let [task, setTask] = useState({});
    let [disabled, setDisabled] = useState(false)
    let { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ mode: 'onChange' })


    useEffect(() => {
        setTask({ ...task, tags: tags });
        tags.length === 5 ? setDisabled(true) : setDisabled(false)
    }, [tags]);

    let addTag = (tag) => {
        const newTag = { tag, id: Date.now() };
        setTags([...tags, newTag])
        reset({ tag: ' ' })
    }

    let removeTag = (e) => {
        setTags(tags.filter((tag) => tag.id !== e))
    }
    let hanldeTask = async (task) => {
        if (room) {
            let taskData = { text: task.text, roomId: room._id, tags }
            await dispatch(submitTask(taskData));
            await dispatch(getRoom(room.name));
            await setTags([])
        }
        if (!error) {
            setOpenTaskAdd(false)
        }
    }

    return (
        <>
            <h2 className='form-page__modal-open ' onClick={() => setOpenTaskAdd(true)}>Создать</h2>
            <Modal open={openTaskAdd} setOpen={setOpenTaskAdd} status={status}>
                <div className='form'>
                    <h3 className='form__title'>Создать задачу</h3>
                    <form className='form__form' onSubmit={handleSubmit(hanldeTask)} >

                        <TextField sx={{ marginBottom: '20px' }} label='Текст' variant="outlined" autoComplete='off'
                            helperText={errors?.text?.message}
                            error={Boolean(errors.text?.message)}
                            {...register('text', {
                                required: 'Напшите текст',
                                pattern: {
                                    value: /^(?!\s+$).+$/,
                                    message: 'Недопустимый текст',
                                },
                            })}
                        />
                        <TextField sx={{ marginBottom: '20px' }} label='Тэг' variant="outlined" autoComplete='off'
                            helperText={errors?.tag?.message}
                            error={Boolean(errors.tag?.message)}
                            {...register('tag', {
                                pattern: {
                                    value: /^(?!\s+$).+$/,
                                    message: 'Недопустимый текст',
                                },
                            })}
                        />
                        {tags?.length > 0 && (<Tags tags={tags} removeTag={removeTag} />)}
                        <span className={disabled ? 'form-page__btn-tag __form__btn-tag-disabled' : 'form__btn-tag'} onClick={() => addTag(watch('tag'))}  >Добавить тег</span>
                        <SubmitButton status={status} text={'Добавить'} />
                        <FormErrors error={error} />
                    </form>
                </div >
            </Modal >
        </>
    )
}
