import SubTaskModel from '../models/SubTasks.js';
import TaskModel from '../models/Task.js';

export const create = async (req, res) => {
    try {
        const { taskId, text } = req.body;
        const task = await TaskModel.findById(taskId);

        const subTask = new SubTaskModel({
            text: text,
            completed: false
        });

        await subTask.save();

        task.subTasks.push(subTask._id);
        await task.save();

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось создать подзадачу',
        });
    }
};

export const getOneSubtask = async (req, res) => {
    const subtaskId = req.params.id;
    try {
        const subtask = await SubTaskModel.findById(subtaskId)

        res.json(subtask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить задачу',
        });
    }
}

export const remove = async (req, res) => {

    try {
        const subTaskId = req.params.id

        await SubTaskModel.findOneAndDelete(subTaskId)
        res.send("Удалено!")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалоь удалить задачу'
        })
    }
}

export const update = async (req, res) => {
    const subTaskId = req.params.id
    console.log('www');
    console.log(req.body.text);
    try {

        await SubTaskModel.updateOne({
            _id: subTaskId
        },
            { text: req.body.text })
        res.send("Updated!")
    } catch (error) {
        console.log(error);
    }
}


export const toggleSubtask = async (req, res) => {
    const subTaskId = req.params.id
    try {
        await SubTaskModel.updateOne({
            _id: subTaskId
        },
            { completed: req.body.completed, })
        res.send("Updated!")
    } catch (error) {
        console.log(error);
    }
}