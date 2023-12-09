import mongoose from "mongoose";

const SubTaskSchema = new mongoose.Schema({
    taskId: {
        type: String
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('SubTasks', SubTaskSchema)

