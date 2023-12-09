import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTasks',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    roomId: String,
    status: String,
},
    { timestamps: true }
)

export default mongoose.model('Task', TaskSchema)