import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import './boards.css';
import { dragTask } from '../../redux/reducers/roomSlicer';
import Tasks from '../task/Tasks';

function Board({ title, listName, tasks, name, roomId }) {
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        dispatch(dragTask({ source, destination, draggableId, roomId }));
    };

    return (
        <div className="boards__board">
            <h1 className='boards__title'>{title}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Tasks listName={listName} name={name} todos={tasks} roomId={roomId} />
            </DragDropContext>
        </div>
    );
}

function Boards() {
    const { room } = useSelector((state) => state.room);
    const roomId = room?._id;
    const name = room?.name;

    return (
        <div className="boards">
            <Board title="Start" listName="start" tasks={room.start} name={name} roomId={roomId} />
            <Board title="Now" listName="now" tasks={room.now} name={name} roomId={roomId} />
            <Board title="Finally" listName="finally" tasks={room.finally} name={name} roomId={roomId} />
        </div>
    );
}

export default Boards;
