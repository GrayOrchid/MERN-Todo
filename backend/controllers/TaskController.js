import TaskModel from '../models/Task.js'
import RoomModel from '../models/Room.js'
import { validationResult } from 'express-validator'


export const getAll = async (req, res) => {
    try {
        const tasks = await TaskModel.find()
        res.json(tasks)
    } catch (error) {
        console.log(error);
    }
}

export const getOne = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await TaskModel.findById(taskId)
            .populate('subTasks')
            .populate('comments')
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить задачу',
        });
    }
}


export const create = async (req, res) => {
    console.log(req.body);
    try {
        const task = new TaskModel({
            text: req.body.text,
            creator: req.userId,
            subTasks: [],
            tags: req.body.tags,
            completed: req.body.completed,
            roomId: req.body.roomId,
        })

        await task.save()
        const room = await RoomModel.findById(req.body.roomId)
        room.start.tasks.push(task._id)
        await room.save()

        res.json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать задачу'
        })
    }
}



export const remove = async (req, res) => {
    try {
        const taskId = req.params.id
        await TaskModel.findByIdAndDelete({ _id: taskId })
        res.send("Deleted!")

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать задачу'
        })
    }
}

export const update = async (req, res) => {
    try {
        const taskId = req.params.id
        await TaskModel.updateOne({
            _id: taskId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tasktags,
            completed: req.body.completed
        })

        res.send("Updated!")
    } catch (error) {
        console.log(error);
    }
}