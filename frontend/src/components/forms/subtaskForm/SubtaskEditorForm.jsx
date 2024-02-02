import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOne } from '../../../redux/reducers/todoSlicer';
import { getOneSubtask, updateSubtask } from '../../../redux/reducers/subtaskSlicer';
import Modal from '../../modal/Modal';
import Form from '../Form';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import SubmitButton from '../../UiComponents/SubmitButton';
import { ToodooValidation } from '../../../utils/RulesForClientValidation';
import { MdModeEdit } from "react-icons/md";

export default function SubtaskFormEditor({ SubTaskId }) {
    const { handleSubmit, formState: { errors }, reset, control } = useForm({ mode: 'onChange' });
    const { status, subtask, updateSubtaskStatus } = useSelector(state => state.subtask);
    const { todo } = useSelector(state => state.todo)

    const [openSubtaskEditor, setOpenSubtaskEditor] = useState(false);

    const dispatch = useDispatch();

    const handleSubmitSubtaskData = async (subtaskFormData) => {
        const subtaskData = { text: subtaskFormData?.text, id: SubTaskId };
        console.log(subtaskData);
        await dispatch(updateSubtask({ subtaskData }));
        dispatch(getOne(todo?._id))
    }


    const getCurrentSubtask = async () => {
        await dispatch(getOneSubtask(SubTaskId))
        await setOpenSubtaskEditor(true)
    }

    useEffect(() => {
        if (updateSubtaskStatus === 'resolved') {
            setOpenSubtaskEditor(false);
        }
    }, [updateSubtaskStatus])





    return (
        <>
            <MdModeEdit className='form__modal-open' onClick={() => getCurrentSubtask()} />
            <Modal open={openSubtaskEditor} setOpen={setOpenSubtaskEditor}>
                <Form title='Изменить подзадачу' submit={handleSubmit(handleSubmitSubtaskData)}>
                    <Controller
                        name="text"
                        control={control}
                        value={subtask?.text}
                        defaultValue={subtask?.text}
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
                    <SubmitButton status={status} text={'Изменить'} />
                </Form>
            </Modal>
        </>

    );
}