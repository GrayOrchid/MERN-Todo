import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    passwordHash: {
        type: String,
        required: true
    },
    color: String
},
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)