import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ProjectTaskStatus = 'in-progress' | 'done'
export type IconId = 'layers' | 'pencil' | 'building' | 'compass'
export type ProjectCardFooterMeta =
    | { type: 'avatars'; extraCount: number }
    | { type: 'time'; label: string }
    | { type: 'overdue' }
    | { type: 'drafting' }

export type ProjectTask = {
    title: string
    description: string
    status: ProjectTaskStatus
}

export type Project = {
    title: string
    description: string
    icon: IconId
    footerMeta: ProjectCardFooterMeta
    tasks: ProjectTask[]
}

const PROJECT_CARD_ATTRIBUTE_SAMPLES: Array<
    Pick<Project, 'icon' | 'footerMeta'>
> = [
        {
            icon: 'layers',
            footerMeta: { type: 'avatars', extraCount: 3 },
        },
        {
            icon: 'pencil',
            footerMeta: { type: 'time', label: 'Update 2h ago' },
        },
        {
            icon: 'building',
            footerMeta: { type: 'overdue' },
        },
        {
            icon: 'compass',
            footerMeta: { type: 'drafting' },
        },
    ]

function pick<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)]!
}

function randomProjectCardAttributes(): Pick<Project, 'icon' | 'footerMeta'> {
    const s = PROJECT_CARD_ATTRIBUTE_SAMPLES
    return {
        icon: pick(s.map((row) => row.icon)),
        footerMeta: pick(s.map((row) => row.footerMeta)) as ProjectCardFooterMeta,
    }
}

interface ProjectState {
    projects: Project[]
}

const initialState: ProjectState = {
    projects: [],
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (
            state,
            action: PayloadAction<{ title: string; description: string }>,
        ) => {
            const attrs = randomProjectCardAttributes()
            state.projects.push({
                title: action.payload.title,
                description: action.payload.description,
                ...attrs,
                tasks: [],
            })
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(
                (project) => project.title !== action.payload,
            )
        },
        addTask: (
            state,
            action: PayloadAction<{ projectTitle: string; task: ProjectTask }>,
        ) => {
            const { projectTitle, task } = action.payload
            const p = state.projects.find((x) => x.title === projectTitle)
            if (!p) return
            p.tasks.push(task)
        },
        deleteTask: (
            state,
            action: PayloadAction<{ projectTitle: string; taskIndex: number }>,
        ) => {
            const { projectTitle, taskIndex } = action.payload
            const p = state.projects.find((x) => x.title === projectTitle)
            if (!p) return
            p.tasks = p.tasks.filter((_, i) => i !== taskIndex)
        },
        markTaskDone: (
            state,
            action: PayloadAction<{ projectTitle: string; taskIndex: number }>,
        ) => {
            const { projectTitle, taskIndex } = action.payload
            const p = state.projects.find((x) => x.title === projectTitle)
            if (!p) return
            p.tasks = p.tasks.map((t, i) =>
                i === taskIndex ? { ...t, status: 'done' as const } : t,
            )
        },
    },
})

export const {
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    markTaskDone,
} = projectsSlice.actions
