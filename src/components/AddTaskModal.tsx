import { useEffect, useId, useState } from 'react'
import type { Dispatch } from 'react'
import './NewProjectModal.css'
import './AddTaskModal.css'
import type { ProjectTaskStatus, ProjectsCommand } from '../App'

type AddTaskModalProps = {
  onClose: () => void
  projectsDispatch: Dispatch<ProjectsCommand>
  projectTitle: string
}

function ChecklistIcon() {
  return (
    <svg
      className="new-project-modal__hero-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 11l3 3L22 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AddTaskModal({
  onClose,
  projectsDispatch,
  projectTitle,
}: AddTaskModalProps) {
  const headingId = useId()
  const statusLabelId = useId()
  const nameId = useId()
  const descId = useId()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<ProjectTaskStatus>('in-progress')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

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
        aria-labelledby={headingId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-project-modal__hero">
          <div className="new-project-modal__hero-icon" aria-hidden>
            <ChecklistIcon />
          </div>
          <h2 id={headingId} className="new-project-modal__title">
            New task
          </h2>
          <p className="new-project-modal__subtitle">
            Add a deliverable to this project
          </p>
        </div>

        <div className="new-project-modal__fields">
          <label className="new-project-modal__label" htmlFor={nameId}>
            Task title
          </label>
          <input
            id={nameId}
            className="new-project-modal__input"
            type="text"
            placeholder="e.g., Review structural notes"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="new-project-modal__label" htmlFor={descId}>
            Description
          </label>
          <textarea
            id={descId}
            className="new-project-modal__textarea"
            rows={4}
            placeholder="What needs to happen?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <span className="new-project-modal__label" id={statusLabelId}>
            Status
          </span>
          <div
            className="add-task-modal__toggle"
            role="group"
            aria-labelledby={statusLabelId}
          >
            <span
              className={
                'add-task-modal__toggle-thumb' +
                (status === 'done' ? ' add-task-modal__toggle-thumb--done' : '')
              }
              aria-hidden
            />
            <button
              type="button"
              className={
                'add-task-modal__toggle-btn' +
                (status === 'in-progress'
                  ? ' add-task-modal__toggle-btn--selected'
                  : '')
              }
              aria-pressed={status === 'in-progress'}
              onClick={() => setStatus('in-progress')}
            >
              In progress
            </button>
            <button
              type="button"
              className={
                'add-task-modal__toggle-btn' +
                (status === 'done' ? ' add-task-modal__toggle-btn--selected' : '')
              }
              aria-pressed={status === 'done'}
              onClick={() => setStatus('done')}
            >
              Done
            </button>
          </div>
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
                type: 'ADD_TASK',
                projectTitle,
                task: { title, description, status },
              })
              onClose()
            }}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  )
}
