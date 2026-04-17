import { useId, useState } from 'react'
import './NewProjectModal.css'
import './AddTaskModal.css'
import type { ProjectTaskStatus } from '../redux/projectsSlice'
import { useAppDispatch } from '../redux/hooks'
import { addTask } from '../redux/projectsSlice'
import { ChecklistIcon } from './icons'

type AddTaskModalProps = {
  onClose: () => void
  projectId: number
}

export function AddTaskModal({
  onClose,
  projectId,
}: AddTaskModalProps) {
  const dispatch = useAppDispatch()
  const headingId = useId()
  const statusLabelId = useId()
  const nameId = useId()
  const descId = useId()
  const titleErrorId = useId()

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<ProjectTaskStatus>('in-progress')

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
            className={
              'new-project-modal__input' +
              (titleError ? ' new-project-modal__input--invalid' : '')
            }
            type="text"
            placeholder="e.g., Review structural notes"
            autoComplete="off"
            value={title}
            aria-invalid={titleError != null}
            aria-describedby={titleError ? titleErrorId : undefined}
            onChange={(e) => {
              setTitleError(null)
              setTitle(e.target.value)
            }}
          />
          {titleError ? (
            <p id={titleErrorId} className="new-project-modal__field-error" role="alert">
              {titleError}
            </p>
          ) : null}

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
              const name = title.trim()
              if (!name) {
                setTitleError('Title is required')
                return
              }
              dispatch(
                addTask({
                  projectId,
                  name,
                  description,
                  markDone: status === 'done',
                }),
              )
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
