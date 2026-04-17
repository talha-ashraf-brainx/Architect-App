import './ProjectTaskTile.css'
import type { ProjectTaskStatus } from '../redux/projectsSlice'
import { useAppDispatch } from '../redux/hooks'
import { deleteTask, markTaskDone } from '../redux/projectsSlice'
import { TrashIcon } from './icons'

export type ProjectTaskTileProps = {
  name: string
  markDone: boolean
  dueLabel?: string
  caption?: string
  projectId: number
  taskId: number
}

const STATUS_LABEL: Record<ProjectTaskStatus, string> = {
  'in-progress': 'In progress',
  done: 'Done',
}

export function ProjectTaskTile({
  name,
  markDone,
  dueLabel,
  caption,
  projectId,
  taskId,
}: ProjectTaskTileProps) {
  const dispatch = useAppDispatch()
  const status: ProjectTaskStatus = markDone ? 'done' : 'in-progress'
  const isDone = markDone

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
                  markTaskDone({ projectId, taskId }),
                )
              }}
            >
              Mark done
            </button>
          ) : null}
          <button
            type="button"
            className="project-task-tile__delete"
            aria-label={'Delete task ' + name}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                deleteTask({ projectId, taskId }),
              )
            }}
          >
            <TrashIcon className="project-task-tile__trash-icon" />
          </button>
        </div>
      </div>
      <h3 className="project-task-tile__title">{name}</h3>
      {caption ? (
        <p className="project-task-tile__caption">{caption}</p>
      ) : null}
    </article>
  )
}
