import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Modal from '../../modal/Modal';
import { submitTask } from '../../../redux/reducers/todoSlicer';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import FormErrors from '../FormErrors';
import Tags from './Tags';
import SubmitButton from '../../UiComponents/SubmitButton';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Form from '../Form';
import { ToodooValidation } from '../../../utils/RulesForClientValidation';

export default function TaskAddForm() {

    const dispatch = useDispatch();
    const { error, status } = useSelector(state => state.todo)
    const { room } = useSelector(state => state.room)
    const [openTaskAdd, setOpenTaskAdd] = useState(false)
    const [tags, setTags] = useState([])
    const [task, setTask] = useState({});
    const [disabled, setDisabled] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ mode: 'onChange' })

    useEffect(() => {
        setTask({ ...task, tags: tags });
        tags.length >= 5 ? setDisabled(true) : setDisabled(false)
    }, [tags]);


    const addTag = (tag) => {
        if (tag.trim() !== '') {
            const newTag = { tag, id: Date.now() };
            setTags([...tags, newTag])
            reset({ tag: ' ' });
        }
    }

    const removeTag = (e) => {
        setTags(tags.filter((tag) => tag.id !== e))
    }
    const hanldeTask = async (task) => {
        const taskData = { text: task.text, roomId: room._id, tags }

        await dispatch(submitTask(taskData));
        await dispatch(getRoom(room.name));

    }

    useEffect(() => {
        if (status === 'resolved') {
            setOpenTaskAdd(false)
            reset()
            setTags([])
        }
    }, [status])

    return (
        <>
            <h2 className='form__modal-open' onClick={() => setOpenTaskAdd(true)}>Создать</h2>
            <Modal open={openTaskAdd} setOpen={setOpenTaskAdd} status={status}>
                <Form title='Создать задачу' submit={handleSubmit(hanldeTask)}>
                    <TextField sx={{ marginBottom: '20px' }} label='Текст' variant="outlined" autoComplete='off'
                        helperText={errors?.text?.message}
                        error={Boolean(errors.text?.message)}
                        {...register('text', ToodooValidation)}
                    />
                    <TextField
                        sx={{ marginBottom: '20px' }}
                        label='Тэг'
                        variant="outlined"
                        autoComplete='off'
                        helperText={errors?.tag?.message}
                        error={Boolean(errors.tag?.message)}
                        {...register('tag')}
                    />
                    <Tags tags={tags} removeTag={removeTag} watch={watch} addTag={addTag} disabled={disabled} />
                    <SubmitButton status={status} text={'Добавить'} />
                    <FormErrors error={error} />
                </Form>
            </Modal >
        </>
    )
}
