import { useEffect } from 'react'
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
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { CloseIcon, MenuIcon } from './components/icons'
import { fetchProjects } from './redux/projectsSlice'
import useSidebar from './hooks/useSidebar'
import useModal from './hooks/useModal';


function App() {
  const dispatch = useAppDispatch()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const { showModal, setShowModal } = useModal()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const projectsSlice = useAppSelector((state) => state.projects)
  const { projects, loading, error } = projectsSlice

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
          <NewProjectModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  )
}

export default App
