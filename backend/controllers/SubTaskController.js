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

export const remove = async (req, res) => {
    console.log(req.params.id);
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
    try {
        const subTaskId = req.params.id

        await SubTaskModel.updateOne({
            _id: subTaskId
        }, {
            title: title,
            completed: completed
        })
    } catch (error) {
        console.log(error);
    }
}