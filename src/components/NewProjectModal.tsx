import { useEffect, useId, useState } from 'react'
import './NewProjectModal.css'
import { useAppDispatch } from '../redux/hooks'
import { addProject } from '../redux/projectsSlice'
import { FolderPlusIcon, LockIcon } from './icons'

type NewProjectModalProps = {
  onClose: () => void
}

export function NewProjectModal({ onClose }: NewProjectModalProps) {
  const dispatch = useAppDispatch()
  const titleId = useId()
  const nameId = useId()
  const descId = useId()

  const [newProject, setNewProject] = useState({ title: '', description: '' })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="new-project-modal__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="new-project-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-project-modal__hero">
          <div className="new-project-modal__hero-icon" aria-hidden>
            <FolderPlusIcon />
          </div>
          <h2 id={titleId} className="new-project-modal__title">
            New Project
          </h2>
          <p className="new-project-modal__subtitle">
            Start a fresh editorial canvas
          </p>
        </div>

        <div className="new-project-modal__fields">
          <label className="new-project-modal__label" htmlFor={nameId}>
            Project name
          </label>
          <input
            id={nameId}
            className="new-project-modal__input"
            type="text"
            placeholder="e.g., Skyline Residential"
            autoComplete="off"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />

          <label className="new-project-modal__label" htmlFor={descId}>
            Description
          </label>
          <textarea
            id={descId}
            className="new-project-modal__textarea"
            rows={4}
            placeholder="Define the vision for this project..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
        </div>

        <div className="new-project-modal__actions">
          <button
            type="button"
            className="new-project-modal__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="new-project-modal__create"
            onClick={() => {
              dispatch(
                addProject({
                  title: newProject.title,
                  description: newProject.description,
                }),
              )
              onClose()
            }}
          >
            Create
          </button>
        </div>

        <div className="new-project-modal__meta">
          <span className="new-project-modal__meta-item">
            <span className="new-project-modal__meta-dot" aria-hidden />
            Auto-save active
          </span>
          <span className="new-project-modal__meta-item">
            <LockIcon />
            Private Space
          </span>
        </div>
      </div>
    </div>
  )
}
