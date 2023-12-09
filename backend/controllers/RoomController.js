import RoomModel from "../models/Room.js";

export const create = async (req, res) => {
    let { roomData } = req.body
    try {
        const newRoom = new RoomModel({
            name: roomData,
            start: {
                id: "start",
                tasks: []
            },
            now: {
                id: "now",
                tasks: []
            },
            finally: {
                id: "finally",
                tasks: []
            },
        });

        await newRoom.save();
        res.json(newRoom);
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось создать комнату.',
        });
    }
};


export const getRoom = async (req, res) => {
    try {
        const name = req.params.name;
        const room = await RoomModel.findOne({ name: name })
            .populate('start.tasks')
            .populate('now.tasks')
            .populate('finally.tasks');

        if (room) {
            res.json(room);
        } else {
            res.status(404).json({
                message: 'Комната не найдена.',
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Не удалось найти комнату.',
        });
    }
}

export const getRoomTasksByTag = async (req, res) => {
    try {
        const { name, tag } = req.params;
        const room = await RoomModel.findOne({ name: name })
            .populate({
                path: 'start.tasks',
                match: { tags: { $elemMatch: { tag: tag } } }
            })
            .populate({
                path: 'now.tasks',
                match: { tags: { $elemMatch: { tag: tag } } }
            })
            .populate({
                path: 'finally.tasks',
                match: { tags: { $elemMatch: { tag: tag } } }
            });
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({
                message: 'Комната не найдена.',
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Не удалось найти комнату или задачи по тегу.',
        });
    }
}
