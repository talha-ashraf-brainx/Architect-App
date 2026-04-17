import { useEffect, useReducer } from 'react'

type ModalAction = { type: 'SHOW' } | { type: 'HIDE' }

function modalReducer(_state: boolean, action: ModalAction): boolean {
  switch (action.type) {
    case 'SHOW':
      return true
    case 'HIDE':
      return false
  }
}

export default function useModal() {
  const [showModal, modalDispatch] = useReducer(modalReducer, false)
  const setShowModal = (show: boolean) =>
    modalDispatch({ type: show ? 'SHOW' : 'HIDE' })

  useEffect(() => {
    if (!showModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') modalDispatch({ type: 'HIDE' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showModal])

  useEffect(() => {
    if (!showModal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [showModal])

  return { showModal, setShowModal }
}
