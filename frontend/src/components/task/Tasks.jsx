import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './tasks.css';
import DragItem from './DragItem';
import { motion } from 'framer-motion'
export default function Tasks({ todos, listName, name }) {

    return (
        <Droppable droppableId={listName}>
            {(provided, snapshot) => (
                <motion.div className="todos__list"
                    layout
                    ref={provided.innerRef}
                    {...provided.droppableProps} >
                    {provided.placeholder}
                    {todos?.tasks?.map((task, index) => (
                        <DragItem task={task} key={task._id} index={index} name={name} snapshot={snapshot} />
                    ))}
                </motion.div>
            )}
        </Droppable>
    );
}
