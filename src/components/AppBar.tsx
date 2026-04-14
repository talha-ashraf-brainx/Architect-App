import { useEffect, useRef, useState } from 'react'
import './AppBar.css'
import { NotificationIcon, ProfileIcon, SearchIcon } from './icons'

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
