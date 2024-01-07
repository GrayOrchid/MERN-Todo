import React from 'react'
import { MdOutlineDelete } from "react-icons/md";

export default function Tags({ tags, removeTag }) {
    return (
        <div className='tags'>
            {tags?.map((item) => (
                <div className='tags_tag' key={item.id}>
                    <span className='tags__text' >{item.tag}</span>
                    <MdOutlineDelete className='tags__remove' onClick={(e) => removeTag(item.id)} />
                </div>
            ))}
        </div>
    )
}
