import './ProjectCard.css'
import { useAppDispatch } from '../redux/hooks'
import { deleteProject } from '../redux/projectsSlice'
import type { IconId, ProjectCardFooterMeta } from '../redux/projectsSlice'
import { CardIcon, TasksIcon, TrashIcon } from './icons'

type ProjectCardProps = {
  title: string
  description: string
  taskCount: number
  icon: IconId
  footerMeta: ProjectCardFooterMeta
  onClick?: () => void
}

function FooterRight({ meta }: { meta: ProjectCardFooterMeta }) {
  if (meta.type === 'avatars') {
    return (
      <div className="project-card__avatars" aria-hidden>
        <span className="project-card__avatar project-card__avatar--a" />
        <span className="project-card__avatar project-card__avatar--b" />
        <span className="project-card__avatar-more">+{meta.extraCount}</span>
      </div>
    )
  }
  if (meta.type === 'time') {
    return <span className="project-card__time-pill">{meta.label}</span>
  }
  if (meta.type === 'overdue') {
    return (
      <span className="project-card__overdue">
        <span className="project-card__overdue-dot" />
        Overdue
      </span>
    )
  }
  return <span className="project-card__drafting">Drafting</span>
}

export function ProjectCard({
  onClick,
  title,
  description,
  taskCount,
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
          aria-label={`Delete ${title}`}
          onClick={(e) => {
            e.stopPropagation()
            dispatch(deleteProject(title))
          }}
        >
          <TrashIcon className="project-card__trash-icon" />
        </button>
      </div>
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__description">{description}</p>
      <div className="project-card__footer">
        <div className="project-card__tasks">
          <TasksIcon />
          <span className="project-card__tasks-label">
            {taskCount} tasks
          </span>
        </div>
        <FooterRight meta={footerMeta} />
      </div>
    </article>
  )
}
