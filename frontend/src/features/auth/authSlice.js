import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

//setting out initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//function below will send register user request
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()

            //the line below returns the error message from failed request
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//function below will login request
export const login = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
        try {
           return await authService.login(user) 
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()

            //the line below returns the error message from failed request
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//function below will start logout request
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    }
)

//below is the auth reducers
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //this only carries out normal non async reducers the one below resets state values when needed
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    //account for pending state or the fulfilled or rejected in our async reducer below
    extraReducers: (builder) => {
        builder
        //the case below is for the request is still pending
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        //the case below is for the request is fulfilled
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        //the case below is when the request is rejected (error, denied)
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        //the case below is when the request is still pending
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        //the case below is when the request is fulfilled
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        //the case below is when the request is rejected (error, denied)
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        //the case below if when the logout is fulfiled
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { reset } = authSlice.actions //exporting reset reducer
export default authSlice.reducer