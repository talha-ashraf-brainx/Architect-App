import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { SidebarBrand } from './components/SidebarBrand'
import { SidebarNav } from './components/SidebarNav'
import { SidebarNewProject } from './components/SidebarNewProject'
import { SidebarLogout } from './components/SidebarLogout'
import { AppBar } from './components/AppBar'
import { ProjectsSection } from './components/ProjectsSection'
import { AppFooter } from './components/AppFooter'
import { NewProjectModal } from './components/NewProjectModal'
import type { IconId, ProjectCardFooterMeta } from './components/ProjectCard'

export type ProjectTaskStatus = 'in-progress' | 'done'

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

export type ProjectsCommand =
  | { type: 'ADD'; title: string; description: string }
  | { type: 'DELETE'; title: string }
  | { type: 'ADD_TASK'; projectTitle: string; task: ProjectTask }
  | { type: 'DELETE_TASK'; projectTitle: string; taskIndex: number }
  | { type: 'MARK_TASK_DONE'; projectTitle: string; taskIndex: number }

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

function projectsReducer(state: Project[], action: ProjectsCommand): Project[] {
  switch (action.type) {
    case 'ADD': {
      const attrs = randomProjectCardAttributes()
      const project: Project = {
        title: action.title,
        description: action.description,
        ...attrs,
        tasks: [],
      }
      return [...state, project]
    }
    case 'DELETE':
      return state.filter((p) => p.title !== action.title)
    case 'ADD_TASK':
      return state.map((p) =>
        p.title === action.projectTitle
          ? { ...p, tasks: [...p.tasks, action.task] }
          : p,
      )
    case 'DELETE_TASK':
      return state.map((p) =>
        p.title === action.projectTitle
          ? {
              ...p,
              tasks: p.tasks.filter((_, i) => i !== action.taskIndex),
            }
          : p,
      )
    case 'MARK_TASK_DONE':
      return state.map((p) =>
        p.title === action.projectTitle
          ? {
              ...p,
              tasks: p.tasks.map((t, i) =>
                i === action.taskIndex ? { ...t, status: 'done' as const } : t,
              ),
            }
          : p,
      )
  }
}

function MenuIcon() {
  return (
    <svg
      className="app-sidebar__menu-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [projects, projectsDispatch] = useReducer(projectsReducer, [])

  useEffect(() => {
    const closeIfDesktop = () => {
      if (window.matchMedia('(min-width: 1025px)').matches) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', closeIfDesktop)
    return () => window.removeEventListener('resize', closeIfDesktop)
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    if (!mq.matches) {
      document.body.style.overflow = ''
      return
    }
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  useEffect(() => {
    if (!showModal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [showModal])

  return (
    <>
      <div className="app">
        <header
          className={
            'app-mobile-header' + (sidebarOpen ? ' app-mobile-header--hidden' : '')
          }
        >
          <button
            type="button"
            className="app-sidebar__menu-btn"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
          <SidebarBrand compact />
        </header>

        {sidebarOpen && (
          <div
            className="app-sidebar__backdrop"
            aria-hidden
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={
            'app-sidebar' + (sidebarOpen ? ' app-sidebar--open' : '')
          }
        >
          <div className="app-sidebar__top">
            <SidebarBrand />
            <button
              type="button"
              className="app-sidebar__close"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <SidebarNav onNavigate={() => setSidebarOpen(false)} />
          <div className="app-sidebar__footer">
            <SidebarNewProject setShowModal={setShowModal} />
            <SidebarLogout />
          </div>
        </aside>

        <main className="app-main">
          <AppBar />
          <ProjectsSection
            setShowModal={setShowModal}
            projects={projects}
            projectsDispatch={projectsDispatch}
          />
          <AppFooter />
        </main>

        {showModal && (
          <NewProjectModal onClose={() => setShowModal(false)} projectsDispatch={projectsDispatch} />
        )}
      </div>
    </>
  )
}

export default App
