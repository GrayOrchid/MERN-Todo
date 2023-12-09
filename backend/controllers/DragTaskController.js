import RoomModel from '../models/Room.js';

export const dragTask = async (req, res) => {
    try {
        const { source, destination, draggableId, roomId } = req.body.result;
        const room = await RoomModel.findById(roomId);
        const sourceList = room[source.droppableId];
        const destinationList = room[destination.droppableId];
        const taskToMove = sourceList.tasks.find(task => task.toString() === draggableId);
        sourceList.tasks = sourceList.tasks.filter(task => task.toString() !== draggableId);
        destinationList.tasks.splice(destination.index, 0, taskToMove);
        await room.save();
        res.status(200).json({ message: 'Задача успешно перетащена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при перетаскивании задачи' });
    }
}
