import './ProjectCard.css'
import { useAppDispatch } from '../redux/hooks'
import { deleteProject } from '../redux/projectsSlice'
import type { IconId, ProjectCardFooterMeta } from '../redux/projectsSlice'
import { CardIcon, TasksIcon, TrashIcon } from './icons'

type ProjectCardProps = {
  projectId: number
  name: string
  description: string
  icon: IconId
  footerMeta: ProjectCardFooterMeta
  onClick?: () => void
}

function formatCreatedAt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function FooterRight({ meta }: { meta: ProjectCardFooterMeta }) {
  return (
    <span className="project-card__time-pill">
      {formatCreatedAt(meta.createdAt)}
    </span>
  )
}

export function ProjectCard({
  onClick,
  projectId,
  name,
  description,
  icon,
  footerMeta,
}: ProjectCardProps) {
  const dispatch = useAppDispatch()
  return (
    <article className="project-card" onClick={onClick}>
      <div className="project-card__header">
        <div className="project-card__icon-wrap">
          <CardIcon id={icon} />
        </div>
        <button
          type="button"
          className="project-card__delete"
          aria-label={`Delete ${name}`}
          onClick={(e) => {
            e.stopPropagation()
            dispatch(deleteProject(projectId))
          }}
        >
          <TrashIcon className="project-card__trash-icon" />
        </button>
      </div>
      <h3 className="project-card__title">{name}</h3>
      <p className="project-card__description">{description}</p>
      <div className="project-card__footer">
        <div className="project-card__tasks">
          <TasksIcon />
          <span className="project-card__tasks-label">
            {footerMeta.taskCount} tasks
          </span>
        </div>
        <FooterRight meta={footerMeta} />
      </div>
    </article>
  )
}
