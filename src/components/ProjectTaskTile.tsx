import './ProjectTaskTile.css'
import type { ProjectTaskStatus } from '../App'

export type ProjectTaskTileProps = {
  title: string
  status: ProjectTaskStatus
  dueLabel?: string
  caption?: string
  onMarkDone?: () => void
  onDelete?: () => void
}

function TrashIcon() {
  return (
    <svg
      className="project-task-tile__trash-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const STATUS_LABEL: Record<ProjectTaskStatus, string> = {
  'in-progress': 'In progress',
  done: 'Done',
}

export function ProjectTaskTile({
  title,
  status,
  dueLabel,
  caption,
  onMarkDone,
  onDelete,
}: ProjectTaskTileProps) {
  const isDone = status === 'done'

  return (
    <article
      className={
        'project-task-tile' + (isDone ? ' project-task-tile--done' : '')
      }
    >
      <div className="project-task-tile__header">
        <div className="project-task-tile__top">
          <span
            className={
              'project-task-tile__status project-task-tile__status--' + status
            }
          >
            {STATUS_LABEL[status]}
          </span>
          {dueLabel ? (
            <span className="project-task-tile__due">{dueLabel}</span>
          ) : null}
        </div>
        <div className="project-task-tile__actions">
          {status === 'in-progress' && onMarkDone ? (
            <button
              type="button"
              className="project-task-tile__mark-done"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDone()
              }}
            >
              Mark done
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              className="project-task-tile__delete"
              aria-label={'Delete task ' + title}
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <TrashIcon />
            </button>
          ) : null}
        </div>
      </div>
      <h3 className="project-task-tile__title">{title}</h3>
      {caption ? (
        <p className="project-task-tile__caption">{caption}</p>
      ) : null}
    </article>
  )
}
