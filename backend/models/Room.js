import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
    name: String,
    start: {
        id: String,
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
    },
    now: {
        id: String,
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
    },
    finally: {
        id: String,
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
    },
});
export default mongoose.model('Room', RoomSchema);
