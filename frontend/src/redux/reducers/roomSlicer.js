import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios";



export const createRoom = createAsyncThunk('createRoom', async (roomData, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/room', { roomData })
        console.log(data);
        addOption(roomData)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getRoom = createAsyncThunk('getRoom', async (roomData, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await axios.get(`room/${roomData}`);
        dispatch(addOption(roomData));
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const dragTask = createAsyncThunk('dragTask', async (result, { dispatch, rejectWithValue }) => {
    dispatch(moveTask(result))
    try {
        let { data } = await axios.post(`dragtask`, { result })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const roomSlicer = createSlice({
    name: 'room',
    initialState: {
        room: {},
        options: [],
        tag: null,
        status: null,
        error: null
    },
    reducers: {
        moveTask: (state, action) => {
            const { source, destination, draggableId } = action.payload;
            const sourceList = state.room[source.droppableId];
            const destinationList = state.room[destination.droppableId];
            const taskToMove = sourceList.tasks.find(task => task._id.toString() === draggableId);
            sourceList.tasks.splice(source.index, 1);
            destinationList.tasks.splice(destination.index, 0, taskToMove);
        },

        leave: (state) => {
            return {
                ...state,
                room: {},
                status: null
            };
        },

        addOption: (state, action) => {
            const newOption = action.payload;
            const prevOptions = JSON.parse(window.localStorage.getItem('options')) || [];
            if (!prevOptions.includes(action.payload)) {
                const updatedOptions = [...prevOptions, newOption];
                window.localStorage.setItem('options', JSON.stringify(updatedOptions));
                return {
                    ...state,
                    options: updatedOptions
                };
            }
            return state
        },

    },


    extraReducers: {
        [getRoom.pending]: (state,) => {
            state.status = 'loading'
            state.error = null
        },
        [getRoom.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.room = action.payload;
        },
        [getRoom.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        [createRoom.pending]: (state,) => {
            state.status = 'loading'
            state.error = null
        },
        [createRoom.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.room = action.payload;
        },
        [createRoom.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
})

export const { moveTask, removeTask, leave, addOption } = roomSlicer.actions;
export default roomSlicer.reducer

