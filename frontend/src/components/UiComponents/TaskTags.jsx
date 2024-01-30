import React from 'react'
import './uiComponents.css'

export default function TaskTags({ tags }) {
    return (
        <div className='task-tags'>
            {tags && (<>
                {tags?.map((tag) => (
                    <span
                        className='task-tag'
                        key={tag.id}
                    >
                        {tag.tag}
                    </span>
                ))}</>)}
        </div>
    )
}
