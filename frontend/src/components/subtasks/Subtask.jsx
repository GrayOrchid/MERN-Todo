import React, { useEffect, useState } from 'react'
import SubtaskFormEditor from '../forms/subtaskForm/SubtaskEditorForm'
import { useDispatch } from 'react-redux'
import { deleteSubtask, getOneSubtask, toggleSubtask } from '../../redux/reducers/subtaskSlicer'
import { MdOutlineDelete } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion';
import { TaskBtns } from '../UiComponents/TaskBtns';

export default function Subtask({ subtask }) {
    const { text, _id, completed } = subtask
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch()
    const [isCompletedSubtask, setIsCompletedSubtask] = useState(false)

    useEffect(() => {
        setIsCompletedSubtask(completed)
    }, [])

    const handleSubtaskDelete = (id) => {
        setIsDeleted(true);
        dispatch(deleteSubtask(id))
    }

    const completeSubtask = (subtask) => {
        const completedSubtask = { ...subtask, completed: !isCompletedSubtask };
        setIsCompletedSubtask(completedSubtask.completed)
        dispatch(toggleSubtask(completedSubtask));
    };

    return (
        <AnimatePresence>
            {!isDeleted && (
                <motion.div className='subtasks__subtask'
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 100, }}
                    exit={{ opacity: 0, y: 100 }}
                >
                    <p className={isCompletedSubtask ? 'subtasks__subtask-text __completed' : 'subtasks__subtask-text'}>{text}</p>
                    <TaskBtns handleDelete={handleSubtaskDelete} completeSubtask={completeSubtask} taskData={subtask} type='subtask' />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

