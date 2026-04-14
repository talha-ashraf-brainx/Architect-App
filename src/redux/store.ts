import { configureStore } from "@reduxjs/toolkit"
import { projectsSlice } from "./projectsSlice"

export const store = configureStore({
    reducer: {
        projects: projectsSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch