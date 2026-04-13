import { ProjectTaskTile } from './ProjectTaskTile'
import type { ProjectTaskTileProps } from './ProjectTaskTile'
import './ProjectDetailsPanel.css'
import type { Project } from '../App'

const DUMMY_TASKS: ProjectTaskTileProps[] = [
  {
    title: 'Review facade elevations',
    status: 'in-progress',
    dueLabel: 'Due Fri',
    caption: 'Cross-check curtain wall against structural load diagrams.',
  },
  {
    title: 'Material palette sign-off',
    status: 'todo',
    dueLabel: 'Due next week',
    caption: 'Stone samples and metal finishes for the atrium.',
  },
  {
    title: 'MEP coordination workshop',
    status: 'todo',
    caption: 'Align ceiling zones with mechanical routing.',
  },
  {
    title: 'Site survey appendix',
    status: 'done',
    dueLabel: 'Completed',
    caption: 'Photo log and boundary notes filed for permit set.',
  },
  {
    title: 'Lighting study — gallery wing',
    status: 'in-progress',
    dueLabel: 'Due Wed',
    caption: 'Lux levels and UV filtering for exhibition walls.',
  },
  {
    title: 'Client narrative deck',
    status: 'todo',
    dueLabel: 'Draft',
    caption: 'Short editorial story for the project landing page.',
  },

]

type ProjectDetailsPanelProps = {
  project: Project
  onBack: () => void
}

function BackIcon() {
  return (
    <svg
      className="project-details__back-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      className="project-details__add-task-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProjectDetailsPanel({ project, onBack }: ProjectDetailsPanelProps) {
  return (
    <section
      className="project-details"
      aria-labelledby="project-details-title"
    >
      <div className="project-details__toolbar">
        <button
          type="button"
          className="project-details__back"
          onClick={onBack}
        >
          <BackIcon />
          All projects
        </button>
      </div>

      <header className="project-details__header">
        <div className="project-details__heading">
          <h1 id="project-details-title" className="project-details__title">
            {project.title}
          </h1>
          <span className="project-details__task-pill">
            {project.taskCount} tasks
          </span>
        </div>
        <p className="project-details__description">{project.description}</p>
      </header>

      <div className="project-details__tasks-head">
        <div className="project-details__tasks-head-row">
          <h2 className="project-details__tasks-title">Tasks</h2>
          <button
            type="button"
            className="project-details__add-task"
            aria-label="Add task"
          >
            <PlusIcon />
          </button>
        </div>
        <p className="project-details__tasks-sub">
          Placeholder workload for this canvas — swap for live data later.
        </p>
      </div>

      <div className="project-details__task-grid">
        {DUMMY_TASKS.map((task) => (
          <ProjectTaskTile key={task.title} {...task} />
        ))}
      </div>
    </section>
  )
}
