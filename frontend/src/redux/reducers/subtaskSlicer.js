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

export const getOneSubtask = createAsyncThunk('subtask/getOne', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/subtask/${id}`)
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

export const updateSubtask = createAsyncThunk('subtask/updateSubtask', async (subtask, { rejectWithValue }) => {
    const { text, id } = subtask.subtaskData

    try {
        const { data } = await axios.patch(`/subtask/${id}`, { text })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const toggleSubtask = createAsyncThunk('subtask/toggleSubtask', async (completedSubtask, { rejectWithValue }) => {

    const { _id, completed } = completedSubtask
    try {
        const { data } = await axios.patch(`/subtaskToggle/${_id}`, { completed })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const subtaskSlicer = createSlice({
    name: 'subtask',
    initialState: {
        subtask: {},
        status: null,
        updateSubtaskStatus: null,
        error: null,
    },
    extraReducers: {
        [getOneSubtask.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getOneSubtask.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.subtask = action.payload
        },
        [getOneSubtask.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        [submitSubtask.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [submitSubtask.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.subtask = action.payload
        },
        [submitSubtask.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        [updateSubtask.pending]: (state) => {
            state.updateSubtaskStatus = 'loading'
            state.error = null
        },
        [updateSubtask.fulfilled]: (state, action) => {
            state.updateSubtaskStatus = 'resolved'
            state.subtask = action.payload
        },
        [updateSubtask.rejected]: (state, action) => {
            state.updateSubtaskStatus = 'rejected'
            state.error = action.payload
        },

        [deleteSubtask.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [deleteSubtask.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.subtask = action.payload
        },
        [deleteSubtask.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    },
})

export const { addSubtask } = subtaskSlicer.actions
export default subtaskSlicer.reducer