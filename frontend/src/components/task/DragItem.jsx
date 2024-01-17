import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../redux/reducers/todoSlicer';
import { addTag, filterByTags } from '../../redux/reducers/roomSlicer';
import { TaskBtns } from './TaskBtns';
import { AnimatePresence, motion } from 'framer-motion'
import Task from './Task';

export default function DragItem({ index, task, name }) {
    let { _id } = task
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async (task) => {
        setIsDeleted(true);
        await dispatch(deleteTodo(task._id));
    };

    const tagsFilter = (tag) => {
        dispatch(filterByTags({ tag: tag, roomName: name }));
        dispatch(addTag(tag));
    };

    return (
        <Draggable index={index} key={_id} draggableId={_id.toString()}>
            {(provided) => (

                <motion.div
                    className={isDeleted ? 'todos__task deleted' : 'todos__task'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0 }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {provided.placeholder}
                    <Task task={task} />
                    <TaskBtns task={task} handleDelete={handleDelete} tagsFilter={tagsFilter} />
                </motion.div>

            )}
        </Draggable>
    );
}
