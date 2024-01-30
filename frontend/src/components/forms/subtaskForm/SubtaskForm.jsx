import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOne } from '../../../redux/reducers/todoSlicer';
import { submitSubtask } from '../../../redux/reducers/subtaskSlicer';
import Modal from '../../modal/Modal';
import Form from '../Form';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import SubmitButton from '../../UiComponents/SubmitButton';
import { ToodooValidation } from '../../../utils/RulesForClientValidation';

export default function SubtaskForm({ _id }) {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const { status } = useSelector(state => state.subtask);

    const [openSubtask, setOpenSubtask] = useState(false);

    const dispatch = useDispatch();

    const handleSubmitSubtaskData = async (subtask) => {
        const subtaskData = { text: subtask.text, taskId: _id };
        await dispatch(submitSubtask({ subtaskData }));
        await dispatch(getOne(_id));
    }

    useEffect(() => {
        if (status === 'resolved') {
            setOpenSubtask(false);
        }
    }, [status])

    return (
        <>
            <h2 className='form__modal-open' onClick={() => setOpenSubtask(true)}>Добавить подзадачу</h2>
            <Modal open={openSubtask} setOpen={setOpenSubtask}>
                <Form title='Добавить подзадачу' submit={handleSubmit(handleSubmitSubtaskData)}>
                    <TextField
                        sx={{ marginBottom: '20px' }}
                        label='Текст'
                        variant="outlined"
                        autoComplete='off'
                        helperText={errors?.text?.message}
                        error={Boolean(errors.text?.message)}
                        {...register('text', ToodooValidation)}
                    />
                    <SubmitButton status={status} text={'Добавить'} />
                </Form>
            </Modal>
        </>

    );
}