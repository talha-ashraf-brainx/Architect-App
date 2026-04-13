import { useEffect, useId, useState } from 'react'
import './NewProjectModal.css'
import type { Dispatch } from 'react'
import type { ProjectsCommand } from '../App'

type NewProjectModalProps = {
  onClose: () => void
  projectsDispatch: Dispatch<ProjectsCommand>
}

function FolderPlusIcon() {
  return (
    <svg
      className="new-project-modal__hero-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 8.25A2.25 2.25 0 015.25 6h4.03a2.25 2.25 0 011.59.66l.97.97h5.91A2.25 2.25 0 0120 9.88V17.25A2.25 2.25 0 0117.75 19.5H5.25A2.25 2.25 0 013 17.25V8.25z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 10.5v6M9 13.5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      className="new-project-modal__lock-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 11V8a5 5 0 0110 0v3M6 11h12a1 1 0 011 1v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NewProjectModal({ onClose, projectsDispatch }: NewProjectModalProps) {
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
              projectsDispatch({
                type: 'ADD',
                title: newProject.title,
                description: newProject.description,
              })
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
