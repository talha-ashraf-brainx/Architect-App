import { useEffect, useRef, useState } from 'react'
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    const onPointer = (e: MouseEvent) => {
      const el = searchWrapRef.current
      if (el && !el.contains(e.target as Node)) setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [searchOpen])

  return (
    <header className="app-bar">
      <h1 className="app-bar__title">Project Management</h1>
      <div className="app-bar__actions">
        <div
          className={
            'app-bar__search-cluster' +
            (searchOpen ? ' app-bar__search-cluster--open' : '')
          }
          ref={searchWrapRef}
        >
          <div className="app-bar__search-field-shell">
            <input
              ref={searchInputRef}
              className="app-bar__search-input"
              type="search"
              placeholder="Search projects…"
              autoComplete="off"
              aria-label="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="app-bar__search-trigger"
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
          >
            <SearchIcon />
          </button>
        </div>
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
