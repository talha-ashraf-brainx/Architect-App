import { useState } from 'react'
import { SidebarNewProject } from './SidebarNewProject'
import { ProjectCard } from './ProjectCard'
import { NewDraftCard } from './NewDraftCard'
import './ProjectsSection.css'
import type { Project } from '../App'
import { ProjectDetailsPanel } from './ProjectDetailsPanel'

type ProjectsSectionProps = {
  setShowModal: (show: boolean) => void
  projects: Project[]
}

export function ProjectsSection({
  setShowModal,
  projects,
}: ProjectsSectionProps) {

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const selectedProject = selectedTitle
    ? projects.find((p) => p.title === selectedTitle) ?? null
    : null

  if (selectedProject) {
    return (
      <ProjectDetailsPanel
        project={selectedProject}
        onBack={() => setSelectedTitle(null)}
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
          />
        ))}
        <NewDraftCard onClick={() => setShowModal(true)} />
      </div>

    </section >
  )
}
