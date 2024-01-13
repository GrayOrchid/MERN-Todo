import React from 'react';
import { Droppable } from 'react-beautiful-dnd'
import './tasks.css';
import Task from './Task';

export default function Tasks({ todos, listName, name }) {

    return (
        <Droppable droppableId={listName}>
            {(provided, snapshot) => (
                <div className="todos__list"
                    ref={provided.innerRef}
                    {...provided.droppableProps} >
                    {provided.placeholder}
                    {todos?.tasks?.map((task, index) => (
                        <Task task={task} key={task._id} index={index} name={name} snapshot={snapshot} />
                    ))}
                </div>
            )}
        </Droppable>
    );
}

