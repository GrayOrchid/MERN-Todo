import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../redux/reducers/todoSlicer';
import { addTag, filterByTags, getRoom } from '../../redux/reducers/roomSlicer';
import { TaskBtns } from './TaskBtns';

export default function Task({ index, task, name }) {
    const dispatch = useDispatch();
    let handleDelete = async (task) => {
        if (task) {
            dispatch(deleteTodo(task._id));
            await dispatch(getRoom(name));
        }
    }

    let tagsFilter = (tag) => {
        dispatch(filterByTags({ tag: tag, roomName: name }));
        dispatch(addTag(tag))
    }

    return (
        <Draggable index={index} key={task._id} draggableId={task._id.toString()}>
            {(provided, snapshot) => (
                <div className={snapshot.isDragging ? 'todos__task __dragactive' : 'todos__task'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} >
                    {provided.placeholder}
                    <div className='todos__task-text'>
                        <h6 className='todos__task-title'>{task?.text}</h6>
                        <div className='todos__task-tags'>
                            {task?.tags.map((tag) => (
                                <span className='todos__task-tag' onClick={() => tagsFilter(tag.tag)}>{tag.tag}</span>
                            ))}
                        </div>
                    </div>
                    <TaskBtns task={task} handleDelete={handleDelete} />
                </div>
            )}
        </Draggable>
    )
}