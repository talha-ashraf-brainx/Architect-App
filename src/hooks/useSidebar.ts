import { useEffect, useState } from 'react'

export default function useSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const closeIfDesktop = () => {
      if (window.matchMedia('(min-width: 1025px)').matches) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', closeIfDesktop)
    return () => window.removeEventListener('resize', closeIfDesktop)
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    if (!mq.matches) {
      document.body.style.overflow = ''
      return
    }
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return { sidebarOpen, setSidebarOpen }
}
