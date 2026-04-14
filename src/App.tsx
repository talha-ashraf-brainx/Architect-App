import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { SidebarBrand } from './components/SidebarBrand'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SidebarNav } from './components/SidebarNav'
import { SidebarNewProject } from './components/SidebarNewProject'
import { SidebarLogout } from './components/SidebarLogout'
import { AppBar } from './components/AppBar'
import { ProjectsSection } from './components/ProjectsSection'
import { AppFooter } from './components/AppFooter'
import { NewProjectModal } from './components/NewProjectModal'
import SettingsPage from './components/SettingsPage'
import { useAppSelector } from './redux/hooks'
import type { IconId, ProjectCardFooterMeta } from './redux/projectsSlice'
import { CloseIcon, MenuIcon } from './components/icons'

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

type ModalAction = { type: 'SHOW' } | { type: 'HIDE' }

function modalReducer(_state: boolean, action: ModalAction): boolean {
  switch (action.type) {
    case 'SHOW':
      return true
    case 'HIDE':
      return false
  }
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, modalDispatch] = useReducer(modalReducer, false)
  const projects = useAppSelector((s) => s.projects.projects)
  const setShowModal = (show: boolean) =>
    modalDispatch({ type: show ? 'SHOW' : 'HIDE' })

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
          <Routes>
            <Route
              path="/"
              element={
                <ProjectsSection
                  setShowModal={setShowModal}
                  projects={projects}
                />
              }
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <AppFooter />
        </main>

        {showModal && (
          <NewProjectModal onClose={() => modalDispatch({ type: 'HIDE' })} />
        )}
      </div>
    </>
  )
}

export default App
