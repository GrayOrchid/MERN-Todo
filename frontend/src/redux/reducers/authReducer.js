import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const userSignIn = createAsyncThunk('user/userSignIn', async (registerUserData, { rejectWithValue }) => {
    console.log(registerUserData);
    try {
        const { data } = await axios.post('/auth/register', registerUserData)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userLogin = createAsyncThunk('user/userLogin ', async (loginUserData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/auth/login', loginUserData)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getMe = createAsyncThunk('user/getMe', async (token) => {
    const { data } = await axios.get('auth/me', token)
    return data
})

const userStateReducer = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: null,
        loginError: null,
        registerError: null,
    },
    reducers: {
        clearErrorInfo: (state) => {
            state.loginError = null;
            state.registerError = null;
        },
        logout: (state) => {
            state.data = null
            state.status = null
            window.localStorage.removeItem('token')
        },
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [userLogin.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.data = action.payload
            state.loginError = null
        },
        [userLogin.rejected]: (state, action) => {
            state.status = 'rejected'
            state.loginError = action.payload
        },

        [userSignIn.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [userSignIn.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.data = action.payload
            state.registerError = null;
        },
        [userSignIn.rejected]: (state, action) => {
            state.status = 'rejected'
            state.registerError = action.payload
        },

        [getMe.pending]: (state,) => {
            state.status = 'loading'
            state.error = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.data = action.payload
        },
        [getMe.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    }
},)

export const selectIsAuth = (state) => Boolean(state.user.data)
export default userStateReducer.reducer
export const { logout, clearErrorInfo } = userStateReducer.actions