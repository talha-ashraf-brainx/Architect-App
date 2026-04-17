import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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

function normalizeTask(row: ApiProjectTask): ProjectTask {
    return {
        id: row.id,
        projectId: row.projectId,
        name: row.name,
        description: row.description,
        markDone: row.markDone,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
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

export const deleteTask = createAsyncThunk<
    { projectId: number; taskId: number },
    { projectId: number; taskId: number }
>(
    'projects/deleteTask',
    async ({ projectId, taskId }) => {
        const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            throw new Error('Failed to delete task')
        }

        return { projectId, taskId }
    },
)

export const addTask = createAsyncThunk<ProjectTask, { projectId: number; name: string; description: string; markDone: boolean }>(
    'projects/addTask',
    async ({ projectId, name, description, markDone }) => {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, markDone }),
        })
        if (!response.ok) {
            throw new Error('Failed to add task')
        }
        const text = await response.text()
        if (!text) {
            throw new Error('Failed to add task')
        }
        let raw: ApiProjectTask
        try {
            raw = JSON.parse(text) as ApiProjectTask
        } catch {
            throw new Error('Failed to add task')
        }
        return normalizeTask(raw)
    },
)

export const markTaskDone = createAsyncThunk<
    { projectId: number; taskId: number },
    { projectId: number; taskId: number }
>(
    'projects/markTaskDone',
    async ({ projectId, taskId }) => {
        if (projectId < 0 || taskId < 0) {
            return { projectId, taskId }
        }
        const response = await fetch(
            `/api/projects/${projectId}/tasks/${taskId}/done`,
            {
                method: 'POST',
            },
        )
        if (!response.ok) {
            throw new Error('Failed to mark task done')
        }
        return { projectId, taskId }
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
    reducers: { },

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
          .addCase(deleteTask.fulfilled, (state, action) => {
            state.projects = state.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    return { ...p, tasks: p.tasks.filter((t) => t.id !== action.payload.taskId) }
                }
                return p
            })
          })
          .addCase(addTask.fulfilled, (state, action) => {
            state.projects = state.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    return { ...p, tasks: [...p.tasks, action.payload] }
                }
                return p
            })
          })
         
          .addCase(markTaskDone.fulfilled, (state, action) => {
            const { projectId, taskId } = action.payload
            const p = state.projects.find((x) => x.id === projectId)
            if (!p) return
            const t = p.tasks.find((x) => x.id === taskId)
            if (!t) return
            const now = new Date().toISOString()
            t.markDone = true
            t.updatedAt = now
            p.updatedAt = now
          })
      }})


