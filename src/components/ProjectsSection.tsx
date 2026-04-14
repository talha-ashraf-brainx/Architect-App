import type { Dispatch } from 'react'
import { useState } from 'react'
import { SidebarNewProject } from './SidebarNewProject'
import { ProjectCard } from './ProjectCard'
import { NewDraftCard } from './NewDraftCard'
import './ProjectsSection.css'
import type { Project, ProjectsCommand } from '../App'
import { ProjectDetailsPanel } from './ProjectDetailsPanel'

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

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const selectedProject = selectedTitle
    ? projects.find((p) => p.title === selectedTitle) ?? null
    : null

  function deleteProject(title: string) {
    if (selectedTitle === title) setSelectedTitle(null)
    projectsDispatch({ type: 'DELETE', title })
  }

  if (selectedProject) {
    return (
      <ProjectDetailsPanel
        project={selectedProject}
        onBack={() => setSelectedTitle(null)}
        projectsDispatch={projectsDispatch}
      />
    )
  }

  return (
    <section className="projects-section" aria-labelledby="projects-section-title" >
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
            onClick={() => setSelectedTitle(p.title)}
            title={p.title}
            description={p.description}
            taskCount={p.tasks.length}
            icon={p.icon}
            footerMeta={p.footerMeta}
            onDelete={() => deleteProject(p.title)}
          />
        ))}
        <NewDraftCard onClick={() => setShowModal(true)} />
      </div>

    </section >
  )
}
