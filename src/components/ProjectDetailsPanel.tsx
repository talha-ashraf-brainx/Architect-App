import { useState } from 'react'
import { ProjectTaskTile } from './ProjectTaskTile'
import { AddTaskModal } from './AddTaskModal'
import './ProjectDetailsPanel.css'
import type { Project } from '../redux/projectsSlice'
import { BackIcon, PlusIcon } from './icons'

type ProjectDetailsPanelProps = {
  project: Project
  onBack: () => void
}

export function ProjectDetailsPanel({
  project,
  onBack,
}: ProjectDetailsPanelProps) {
  const [addTaskOpen, setAddTaskOpen] = useState(false)

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
            {project.name}
          </h1>
          <span className="project-details__task-pill">
            {project.tasks.length} tasks
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
            onClick={() => setAddTaskOpen(true)}
          >
            <PlusIcon />
          </button>
        </div>
        <p className="project-details__tasks-sub">
          Track deliverables and reviews for this project.
        </p>
      </div>

      <div className="project-details__task-grid">
        {project.tasks.map((task) => (
          <ProjectTaskTile
            key={task.id}
            name={task.name}
            markDone={task.markDone}
            caption={task.description}
            projectId={project.id}
            taskId={task.id}
          />
        ))}
      </div>

      {addTaskOpen ? (
        <AddTaskModal
          onClose={() => setAddTaskOpen(false)}
          projectId={project.id}
        />
      ) : null}
    </section>
  )
}
