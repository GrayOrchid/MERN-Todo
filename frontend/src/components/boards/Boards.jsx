import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import './boards.css';
import { dragTask } from '../../redux/reducers/roomSlicer';
import Tasks from '../task/Tasks';

function Boards() {
    const dispatch = useDispatch();
    const { room } = useSelector((state) => state.room);
    const startTasks = room?.start;
    const nowTasks = room?.now;
    const finallyTasks = room?.finally;
    const roomId = room?._id;
    const name = room?.name;

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        dispatch(dragTask({ source, destination, draggableId, roomId }));
    };

    return (
        <div className="boards">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="boards__board">
                    <h1 className='boards__title'>Start</h1>
                    <Tasks listName="start" name={name} todos={startTasks} roomId={roomId} />
                </div>
                <div className="boards__board">
                    <h1 className='boards__title'>Now</h1>
                    <Tasks listName="now" name={name} todos={nowTasks} roomId={roomId} />
                </div>
                <div className="boards__board">
                    <h1 className='boards__title'>Finally</h1>
                    <Tasks listName="finally" name={name} todos={finallyTasks} roomId={roomId} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default Boards;
