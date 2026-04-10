import './SidebarLogout.css'

function LogoutIcon() {
  return (
    <svg
      className="sidebar-logout__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
