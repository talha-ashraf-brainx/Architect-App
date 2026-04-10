import './SidebarNewProject.css'

export function SidebarNewProject() {
  return (
    <button type="button" className="sidebar-new-project">
      <span className="sidebar-new-project__plus" aria-hidden>
        +
      </span>
      <span>New Project</span>
    </button>
  )
}
