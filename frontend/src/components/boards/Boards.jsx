import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import './boards.css';
import { dragTask } from '../../redux/reducers/roomSlicer';
import Board from './Board';


function Boards() {
    const dispatch = useDispatch();

    const { room } = useSelector((state) => state.room);
    const roomId = room?._id;
    const name = room?.name;



    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        dispatch(dragTask({ source, destination, draggableId, roomId }));
    };


    return (
        <DragDropContext onDragEnd={onDragEnd} liftInstruction=" вв">
            <div className="boards">
                <Board title="Start" listName="start" tasks={room?.start} name={name} roomId={roomId} />
                <Board title="Now" listName="now" tasks={room?.now} name={name} roomId={roomId} />
                <Board title="Finally" listName="finally" tasks={room?.finally} name={name} roomId={roomId} />
            </div>
        </DragDropContext>
    );
}

export default Boards;
