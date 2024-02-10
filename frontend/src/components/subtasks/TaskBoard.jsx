import React, { useEffect } from 'react'
import Subtasks from './Subtasks';
import './subtasks.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOne } from '../../redux/reducers/todoSlicer';
import TaskTags from '../UiComponents/TaskTags';
export default function TaskBoard({ _id }) {
    const { todo } = useSelector((state) => state.todo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOne(_id))
    }, [])



    return (
        <>
            {todo && (
                <div className='task-board'>
                    <div className='task-board__contnent'>
                        <div className="task-board__main-task">
                            <h1 className='task-board__text'>{todo?.text}</h1>
                            <TaskTags tags={todo?.tags} />
                        </div>
                        <Subtasks todo={todo} />
                    </div>
                </div>
            )}</>
    )
}
