import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getOne, updateTask } from '../../../redux/reducers/todoSlicer';
import { MdEdit } from "react-icons/md";
import { TextField } from '@mui/material';
import Form from '../Form';
import Tags from './Tags';
import SubmitButton from '../../UiComponents/SubmitButton';
import { getRoom } from '../../../redux/reducers/roomSlicer';
import { useForm } from 'react-hook-form';
import FormErrors from '../FormErrors';
import { Controller } from 'react-hook-form';
import { ToodooValidation } from '../../../utils/RulesForClientValidation';

export default function EditTaskForm({ taskId }) {
  const [openTaskEditor, setOpenTaskEditor] = useState(false)
  const { error, status, taskUpdateStatus, todo } = useSelector(state => state.todo)
  const [disabled, setDisabled] = useState(true)
  const { register, handleSubmit, watch, formState: { errors }, reset, control } = useForm({ mode: 'onChange' })
  const [tags, setTags] = useState([])
  const { room } = useSelector(state => state.room)

  const dispatch = useDispatch()

  useEffect(() => {
    tags?.length >= 5 ? setDisabled(true) : setDisabled(false)
  }, [tags]);

  const getCurrentTask = async () => {
    await dispatch(getOne(taskId))
    await setTags(todo?.tags)
    await setOpenTaskEditor(true)
  }



  useEffect(() => {
    if (taskUpdateStatus == 'resolved') {
      setOpenTaskEditor(false)
    }
  }, [taskUpdateStatus])


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
    const taskData = { text: task?.text, id: taskId, tags }
    await dispatch(updateTask(taskData));
    await dispatch(getRoom(room.name));
  }


  return (
    <>
      <MdEdit className='todos__task-btn' onClick={() => getCurrentTask()} />
      <Modal open={openTaskEditor} setOpen={setOpenTaskEditor} status={status} >
        <Form title='Изменить задачу' submit={handleSubmit(hanldeTask)}>
          <Controller
            name="text"
            control={control}
            value={todo?.text}
            defaultValue={todo?.text}
            rules={ToodooValidation}
            render={({ field }) => (
              <TextField
                sx={{ marginBottom: '20px' }}
                label='Текст'
                variant="outlined"
                autoComplete='off'
                helperText={errors?.text?.message}
                error={Boolean(errors.text?.message)}
                {...field}
              />
            )}
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
          <SubmitButton status={status} text={'Изменить'} />
          <FormErrors error={error} />
        </Form>
      </Modal >
    </>
  )
}
