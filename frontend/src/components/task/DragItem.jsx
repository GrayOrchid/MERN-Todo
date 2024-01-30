import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../redux/reducers/todoSlicer';
import { TaskBtns } from './TaskBtns';
import { AnimatePresence, motion } from 'framer-motion'
import Task from './Task';

export default function DragItem({ index, task, name }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async (task) => {
        setIsDeleted(true);
        await dispatch(deleteTodo(task._id));
    };


    return (
        <AnimatePresence>
            {!isDeleted && (
                <Draggable index={index} key={task._id} draggableId={task._id}>
                    {(provided) => (
                        <motion.div
                            className='todos__task'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 100, }}
                            exit={{ opacity: 0, y: 100 }}
                        >
                            {provided.placeholder}
                            <Task task={task} />
                            <TaskBtns task={task} handleDelete={handleDelete} />
                        </motion.div>
                    )}
                </Draggable>
            )}</AnimatePresence>

    );
}
