import React from 'react'
import Subtask from './Subtask';

export default function Subtasks({ todo }) {
    return (
        <div className='subtasks'>

            {todo?.subTasks?.map((subtask) => (
                <Subtask subtask={subtask} />
            ))}
        </div>
    )
}
