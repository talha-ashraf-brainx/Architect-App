import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ProjectTaskStatus = 'in-progress' | 'done'
export type IconId = 'layers' | 'pencil' | 'building' | 'compass'

const PROJECT_ICONS: IconId[] = ['layers', 'pencil', 'building', 'compass']

export function iconIdForProject(id: number): IconId {
    return PROJECT_ICONS[Math.abs(id) % PROJECT_ICONS.length]!
}

export type ProjectCardFooterMeta = {
    taskCount: number
    createdAt: string
}

export type ProjectTask = {
    id: number
    projectId: number
    name: string
    description: string
    markDone: boolean
    createdAt: string
    updatedAt: string
}

export type Project = {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
    footerMeta: ProjectCardFooterMeta
    tasks: ProjectTask[]
}

type ApiProjectTask = {
    id: number
    projectId: number
    name: string
    description: string
    markDone: boolean
    createdAt: string
    updatedAt: string
}

type ApiProject = {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
    tasks?: ApiProjectTask[]
}

function normalizeProject(row: ApiProject): Project {
    const tasks = row.tasks ?? []
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        tasks: tasks.map((t) => ({ ...t })),
        footerMeta: {
            taskCount: tasks.length,
            createdAt: row.createdAt,
        },
    }
}

export const fetchProjects = createAsyncThunk<Project[]>(
    'projects/fetchProjects',
    async () => {
      const response = await fetch('/api/projects')
  
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data: ApiProject[] = await response.json()
      return data.map(normalizeProject)
    }
  )

export const deleteProject = createAsyncThunk<number, number>(
    'projects/deleteProject',
    async (projectId) => {
        if (projectId < 0) {
            return projectId
        }
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error('Failed to delete project')
        }
        return projectId
    },
)

export const addProject = createAsyncThunk<Project, { name: string; description: string }>(
    'projects/addProject',
    async (project: { name: string; description: string }) => {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        if (!response.ok) {
            throw new Error('Failed to add project')
        }
        const text = await response.text()
        if (!text) {
            throw new Error('Failed to add project')
        }
        let raw: ApiProject
        try {
            raw = JSON.parse(text) as ApiProject
            console.log(raw)
        } catch {
            throw new Error('Failed to add project')
        }
        return normalizeProject(raw)
    },
)

interface ProjectState {
    projects: Project[],
    loading: boolean,
    error: string | null,
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addTask: (
            state,
            action: PayloadAction<{
                projectId: number
                name: string
                description: string
                markDone: boolean
            }>,
        ) => {
            const { projectId, name, description, markDone } = action.payload
            const p = state.projects.find((x) => x.id === projectId)
            if (!p) return
            const now = new Date().toISOString()
            const nextTaskId = Math.min(0, ...p.tasks.map((t) => t.id)) - 1
            p.tasks.push({
                id: nextTaskId,
                projectId: p.id,
                name,
                description,
                markDone,
                createdAt: now,
                updatedAt: now,
            })
            p.footerMeta = {
                ...p.footerMeta,
                taskCount: p.tasks.length,
            }
            p.updatedAt = now
        },
        deleteTask: (
            state,
            action: PayloadAction<{ projectId: number; taskId: number }>,
        ) => {
            const { projectId, taskId } = action.payload
            const p = state.projects.find((x) => x.id === projectId)
            if (!p) return
            p.tasks = p.tasks.filter((t) => t.id !== taskId)
            const now = new Date().toISOString()
            p.footerMeta = {
                ...p.footerMeta,
                taskCount: p.tasks.length,
            }
            p.updatedAt = now
        },
        markTaskDone: (
            state,
            action: PayloadAction<{ projectId: number; taskId: number }>,
        ) => {
            const { projectId, taskId } = action.payload
            const p = state.projects.find((x) => x.id === projectId)
            if (!p) return
            const t = p.tasks.find((x) => x.id === taskId)
            if (!t) return
            const now = new Date().toISOString()
            t.markDone = true
            t.updatedAt = now
            p.updatedAt = now
        },
    },

    extraReducers: (builder) => {
        builder
          .addCase(fetchProjects.pending, (state) => {
            state.loading = true
            state.error = null
          })
          .addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload
          })
          .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message ?? 'Something went wrong'
          })
          .addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter(
                (p) => p.id !== action.payload,
            )
          })
          .addCase(addProject.fulfilled, (state, action) => {
            state.projects = [...state.projects, action.payload]
          })
          
         
      }})

export const {
    addTask,
    deleteTask,
    markTaskDone,
} = projectsSlice.actions
