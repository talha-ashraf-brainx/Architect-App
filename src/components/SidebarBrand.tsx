import './SidebarBrand.css'
import { GeometricIcon } from './icons'

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
