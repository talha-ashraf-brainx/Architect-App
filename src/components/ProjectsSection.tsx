import type { Dispatch } from 'react'
import { SidebarNewProject } from './SidebarNewProject'
import { ProjectCard } from './ProjectCard'
import { NewDraftCard } from './NewDraftCard'
import './ProjectsSection.css'
import type { Project, ProjectsCommand } from '../App'

type ProjectsSectionProps = {
  setShowModal: (show: boolean) => void
  projects: Project[]
  projectsDispatch: Dispatch<ProjectsCommand>
}

export function ProjectsSection({
  setShowModal,
  projects,
  projectsDispatch,
}: ProjectsSectionProps) {
  function deleteProject(title: string) {
    projectsDispatch({ type: 'DELETE', title })
  }

  return (
    <section className="projects-section" aria-labelledby="projects-section-title">
      <div className="projects-section__header">
        <div className="projects-section__intro">
          <h2 id="projects-section-title" className="projects-section__title">
            Projects
          </h2>
          <p className="projects-section__subtitle">
            Manage your architectural blueprints and editorial workflows from a
            single precision-tuned interface.
          </p>
        </div>
        <SidebarNewProject widthPx={224} setShowModal={setShowModal} />
      </div>

      <div className="projects-section__grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            description={p.description}
            taskCount={p.taskCount}
            icon={p.icon}
            footerMeta={p.footerMeta}
            onDelete={() => deleteProject(p.title)}
          />
        ))}
        <NewDraftCard onClick={() => setShowModal(true)} />
      </div>

    </section>
  )
}
