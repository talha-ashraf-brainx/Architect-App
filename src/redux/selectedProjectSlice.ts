import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { deleteProject } from './projectsSlice'

interface SelectedProjectState {
    selectedTitle: string | null
}

const initialState: SelectedProjectState = {
    selectedTitle: null,
}

export const selectedProjectSlice = createSlice({
    name: 'selectedProject',
    initialState,
    reducers: {
        setSelectedTitle: (state, action: PayloadAction<string | null>) => {
            state.selectedTitle = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteProject, (state, action) => {
            if (state.selectedTitle === action.payload) {
                state.selectedTitle = null
            }
        })
    },
})

export const { setSelectedTitle } = selectedProjectSlice.actions
