import React from 'react'
import TaskTags from '../UiComponents/TaskTags'


export default function Task({ task }) {

    let { tags, text } = task

    return (
        <div className='todos__task-text'>
            <h6 className='todos__task-title'>{text}</h6>
            <TaskTags tags={tags} />
        </div>
    )
}
