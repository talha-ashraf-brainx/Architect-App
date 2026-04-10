import './SidebarNewProject.css'

type SidebarNewProjectProps = {
  widthPx?: number
}

export function SidebarNewProject({ widthPx }: SidebarNewProjectProps) {
  return (
    <button
      type="button"
      className="sidebar-new-project"
      style={
        widthPx !== undefined
          ? { width: `${widthPx}px`, boxSizing: 'border-box' }
          : undefined
      }
    >
      <span className="sidebar-new-project__plus" aria-hidden>
        +
      </span>
      <span>New Project</span>
    </button>
  )
}
