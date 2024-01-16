import React from 'react'

export default function Task({ task, tagsFilter }) {

    let { tags, text } = task

    return (
        <div className='todos__task-text'>
            <h6 className='todos__task-title'>{text}</h6>
            <div className='todos__task-tags'>
                {tags.map((tag) => (
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
    )
}
