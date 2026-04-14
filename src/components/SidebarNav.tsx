import { NavLink } from 'react-router-dom'
import './SidebarNav.css'

const items = [
  { id: 'projects', label: 'Projects', to: '/' },
  { id: 'settings', label: 'Settings', to: '/settings' },
] as const

function ProjectsIcon() {
  return (
    <svg
      className="sidebar-nav__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 8.5V18a1 1 0 001 1h14a1 1 0 001-1V8.5M4 8.5V7a1 1 0 011-1h4.5l1.7 2H19a1 1 0 011 1v.5M4 8.5h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg
      className="sidebar-nav__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type SidebarNavProps = {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav className="sidebar-nav" aria-label="Application">
      <ul className="sidebar-nav__list">
        {items.map(({ id, label, to }) => (
          <li key={id}>
            <NavLink
              to={to}
              end={to === '/'}
              onClick={() => onNavigate?.()}
              className={({ isActive }) =>
                'sidebar-nav__item' +
                (isActive ? ' sidebar-nav__item--selected' : '')
              }
            >
              {id === 'projects' ? <ProjectsIcon /> : <SettingsIcon />}
              <span className="sidebar-nav__label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
