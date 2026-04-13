import './ProjectTaskTile.css'

export type TaskTileStatus = 'todo' | 'in-progress' | 'done'

export type ProjectTaskTileProps = {
  title: string
  status: TaskTileStatus
  dueLabel?: string
  caption?: string
}

const STATUS_LABEL: Record<TaskTileStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
}

export function ProjectTaskTile({
  title,
  status,
  dueLabel,
  caption,
}: ProjectTaskTileProps) {
  return (
    <article className="project-task-tile">
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
      <h3 className="project-task-tile__title">{title}</h3>
      {caption ? (
        <p className="project-task-tile__caption">{caption}</p>
      ) : null}
    </article>
  )
}
