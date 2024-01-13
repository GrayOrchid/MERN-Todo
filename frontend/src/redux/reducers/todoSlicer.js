import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios";


export const getOne = createAsyncThunk('todos/getOne', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/tasks/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const submitTask = createAsyncThunk('todos/submitTask', async (task, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/tasks', task)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodos', async (id, { rejectWithValue }) => {
    try {
        axios.delete(`tasks/${id}`)
        console.log(`tasks/${id}`);
    } catch (error) {
        return rejectWithValue(error)
    }
})

const todoSlicer = createSlice({
    name: 'todo',
    initialState: {
        todo: {},
        status: null,
        error: null
    },
    extraReducers: {
        [submitTask.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [submitTask.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todo = action.payload
        },
        [submitTask.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        [deleteTodo.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [deleteTodo.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todo = action.payload
            console.log('deleted');
        },
        [deleteTodo.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },

        [getOne.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getOne.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todo = action.payload
        },
        [getOne.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})
export const { addTodo, toggleTododo, removeTodo } = todoSlicer.actions
export default todoSlicer.reducer










