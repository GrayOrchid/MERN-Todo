import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios";



export const submitSubtask = createAsyncThunk('submitSubtask', async (subtaskData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/subtask', subtaskData.subtaskData)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const deleteSubtask = createAsyncThunk('deleteSubtask', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/subtask/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const subtaskSlicer = createSlice({
    name: 'subtask',
    initialState: {
        subtasks: [],
        status: null,
        error: null,
    },
})

export const { addSubtask } = subtaskSlicer.actions
export default subtaskSlicer.reducer