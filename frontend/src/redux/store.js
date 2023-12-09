import { configureStore } from '@reduxjs/toolkit'
import todoSlicer from './reducers/todoSlicer'
import userStateReducer from './reducers/authReducer'
import roomSlicer from './reducers/roomSlicer'
import subtaskSlicer from './reducers/subtaskSlicer'

export default configureStore({
    reducer: {
        todo: todoSlicer,
        user: userStateReducer,
        room: roomSlicer,
        subtask: subtaskSlicer
    }
})