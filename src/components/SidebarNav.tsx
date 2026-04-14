import { NavLink } from 'react-router-dom'
import './SidebarNav.css'
import { ProjectsIcon, SettingsIcon } from './icons'

const items = [
  { id: 'projects', label: 'Projects', to: '/' },
  { id: 'settings', label: 'Settings', to: '/settings' },
] as const

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
