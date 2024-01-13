import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Subtasks from '../subtasks/Subtasks';
import { getOne } from '../../redux/reducers/todoSlicer';
import { deleteSubtask } from '../../redux/reducers/subtaskSlicer';
import './taskBoard.css'

export default function TaskBoard({ _id }) {
    const { todo } = useSelector((state) => state.todo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOne(_id))
    }, []);

    const hanldeDelete = async (id) => {
        await dispatch(deleteSubtask(id))
        await dispatch(getOne(_id))
    }
    return (
        <div className='task-board'>
            <div className='task-board__contnent'>
                <h1 className='task-board__text'>{todo.text}</h1>
                <Subtasks todo={todo} _id={_id} hanldeDelete={hanldeDelete} />
            </div>
        </div>
    )
}
