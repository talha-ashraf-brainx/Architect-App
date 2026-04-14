import { configureStore } from "@reduxjs/toolkit"
import { projectsSlice } from "./projectsSlice"
import { selectedProjectSlice } from "./selectedProjectSlice"

export const store = configureStore({
    reducer: {
        projects: projectsSlice.reducer,
        selectedProject: selectedProjectSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch