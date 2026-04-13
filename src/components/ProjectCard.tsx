import './ProjectCard.css'

export type IconId = 'layers' | 'pencil' | 'building' | 'compass'

export type ProjectCardFooterMeta =
  | { type: 'avatars'; extraCount: number }
  | { type: 'time'; label: string }
  | { type: 'overdue' }
  | { type: 'drafting' }

type ProjectCardProps = {
  title: string
  description: string
  taskCount: number
  icon: IconId
  footerMeta: ProjectCardFooterMeta
  onDelete?: () => void
}

function CardIcon({ id }: { id: IconId }) {
  const common = {
    className: 'project-card__glyph',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg' as const,
    'aria-hidden': true as const,
  }
  switch (id) {
    case 'layers':
      return (
        <svg {...common}>
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'pencil':
      return (
        <svg {...common}>
          <path
            d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'building':
      return (
        <svg {...common}>
          <path
            d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18M6 12H4a2 2 0 00-2 2v8h20v-8a2 2 0 00-2-2h-2M10 6h4M10 10h4M10 14h4M10 18h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'compass':
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 100-20 10 10 0 000 20z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}

function TrashIcon() {
  return (
    <svg
      className="project-card__trash-icon"
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

function TasksIcon() {
  return (
    <svg
      className="project-card__tasks-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12l2.5 2.5L16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
  title,
  description,
  taskCount,
  icon,
  footerMeta,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__header">
        <div className="project-card__icon-wrap">
          <CardIcon id={icon} />
        </div>
        <button
          type="button"
          className="project-card__delete"
          aria-label={`Delete ${title}`}
          onClick={onDelete}
        >
          <TrashIcon />
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
