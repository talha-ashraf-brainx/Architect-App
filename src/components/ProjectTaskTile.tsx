import './ProjectTaskTile.css'
import type { ProjectTaskStatus } from '../App'
import { useAppDispatch } from '../redux/hooks'
import { deleteTask, markTaskDone } from '../redux/projectsSlice'
import { TrashIcon } from './icons'

export type ProjectTaskTileProps = {
  title: string
  status: ProjectTaskStatus
  dueLabel?: string
  caption?: string
  projectTitle: string
  taskIndex: number
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
  projectTitle,
  taskIndex,
}: ProjectTaskTileProps) {
  const dispatch = useAppDispatch()
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
          {status === 'in-progress' ? (
            <button
              type="button"
              className="project-task-tile__mark-done"
              onClick={(e) => {
                e.stopPropagation()
                dispatch(
                  markTaskDone({ projectTitle, taskIndex }),
                )
              }}
            >
              Mark done
            </button>
          ) : null}
          <button
            type="button"
            className="project-task-tile__delete"
            aria-label={'Delete task ' + title}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                deleteTask({ projectTitle, taskIndex }),
              )
            }}
          >
            <TrashIcon className="project-task-tile__trash-icon" />
          </button>
        </div>
      </div>
      <h3 className="project-task-tile__title">{title}</h3>
      {caption ? (
        <p className="project-task-tile__caption">{caption}</p>
      ) : null}
    </article>
  )
}
