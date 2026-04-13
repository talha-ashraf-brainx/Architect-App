import './SidebarNewProject.css'

type SidebarNewProjectProps = {
  widthPx?: number
  setShowModal: (show: boolean) => void
}

export function SidebarNewProject({ widthPx, setShowModal }: SidebarNewProjectProps) {
  return (
    <button
      type="button"
      className="sidebar-new-project"
      style={
        widthPx !== undefined
          ? { width: `${widthPx}px`, boxSizing: 'border-box' }
          : undefined
      }
      onClick={() => setShowModal(true)}
    >
      <span className="sidebar-new-project__plus" aria-hidden>
        +
      </span>
      <span>New Project</span>
    </button>
  )
}
