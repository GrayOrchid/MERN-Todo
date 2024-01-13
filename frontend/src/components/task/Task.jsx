import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../redux/reducers/todoSlicer';
import { addTag, filterByTags } from '../../redux/reducers/roomSlicer';
import { TaskBtns } from './TaskBtns';

export default function Task({ index, task, name }) {
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
        <Draggable index={index} key={task._id} draggableId={task._id.toString()}>
            {(provided, snapshot) => (
                <div>
                    {isDeleted ? null : (
                        <div
                            className={snapshot.isDragging ? 'todos__task __dragactive' : 'todos__task'}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {provided.placeholder}
                            <div className='todos__task-text'>
                                <h6 className='todos__task-title'>{task?.text}</h6>
                                <h1>{task._id}</h1>
                                <div className='todos__task-tags'>
                                    {task?.tags.map((tag) => (
                                        <span
                                            key={tag.tag}
                                            className='todos__task-tag'
                                            onClick={() => tagsFilter(tag.tag)}
                                        >
                                            {tag.tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <TaskBtns task={task} handleDelete={handleDelete} />
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}
