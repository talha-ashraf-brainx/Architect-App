import './SidebarLogout.css'
import { LogoutIcon } from './icons'

export function SidebarLogout() {
  return (
    <section className="sidebar-logout-section" aria-label="Account">
      <button type="button" className="sidebar-logout">
        <LogoutIcon />
        <span>Logout</span>
      </button>
    </section>
  )
}
