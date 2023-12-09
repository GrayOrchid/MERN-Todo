import './subtasks.css'
import React from 'react'
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";

export default function Subtasks({ hanldeDelete, todo }) {
    return (
        <div className='subtasks'>
            {todo?.subTasks?.map((subtask) => (
                <div className='subtasks__subtask'>
                    <p className='subtasks__subtask-text'>{subtask?.text}</p>
                    <div className='subtasks__subtask-btns'>
                        <MdOutlineDelete className='subtasks__subtask-btn subtasks__subtask-remove' onClick={() => hanldeDelete(subtask?._id)} />
                        <MdModeEdit className='subtasks__subtask-btn subtasks__subtask-edit' />
                    </div>
                </div>
            ))}
        </div>
    )
}
