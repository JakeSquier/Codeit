import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectService from './projectService'

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new project
export const createProject = createAsyncThunk('projects/create',
    async (projectData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await projectService.createProject(projectData, token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update project
export const updateProject = createAsyncThunk('projects/update',
    async (projectData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await projectService.updateProject(projectData, token)
        } catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete project
export const deleteProject = createAsyncThunk('projects/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await projectService.deleteProject(id, token)
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get all user projects
export const getUserProjects = createAsyncThunk('projects/get',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await projectService.getUserProjects(id, token)
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get user project
export const getUserProject = createAsyncThunk('projects/get',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await projectService.getUserProject(id, token)
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get public project
export const getPublicProject = createAsyncThunk('projects/get',
    async (id, thunkAPI) => {
        try {
            return await projectService.getPublicProject(id)
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => {
            state.projects = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
            .addCase(deleteProject.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
            .addCase(updateProject.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
            .addCase(getUserProjects.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUserProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(getUserProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
            .addCase(getUserProject.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getUserProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(getUserProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
            .addCase(getPublicProject.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPublicProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = [...action.payload]
            })
            .addCase(getPublicProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.projects = state.projects
            })
    }
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer