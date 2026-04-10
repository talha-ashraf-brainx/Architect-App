import './SidebarBrand.css'

function GeometricIcon() {
  return (
    <svg
      className="sidebar-brand__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="4" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <rect x="13" y="4" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <rect x="4" y="13" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <rect x="13" y="13" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.5" />
    </svg>
  )
}

type SidebarBrandProps = {
  compact?: boolean
}

export function SidebarBrand({ compact }: SidebarBrandProps) {
  return (
    <div className={'sidebar-brand' + (compact ? ' sidebar-brand--compact' : '')}>
      <div className="sidebar-brand__icon-box">
        <GeometricIcon />
      </div>
      <div className="sidebar-brand__copy">
        <span className="sidebar-brand__title">Architect</span>
        <span className="sidebar-brand__subtitle">Precision Editorial</span>
      </div>
    </div>
  )
}
