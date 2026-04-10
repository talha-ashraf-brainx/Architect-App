import './AppBar.css'

function SearchIcon() {
  return (
    <svg
      className="app-bar__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NotificationIcon() {
  return (
    <svg
      className="app-bar__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      className="app-bar__icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppBar() {
  return (
    <header className="app-bar">
      <h1 className="app-bar__title">Project Management</h1>
      <div className="app-bar__actions">
        <button type="button" className="app-bar__icon-btn" aria-label="Search">
          <SearchIcon />
        </button>
        <button type="button" className="app-bar__icon-btn" aria-label="Notifications">
          <NotificationIcon />
        </button>
        <button type="button" className="app-bar__icon-btn" aria-label="Profile">
          <ProfileIcon />
        </button>
      </div>
    </header>
  )
}
