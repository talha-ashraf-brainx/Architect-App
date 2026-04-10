import { SidebarNewProject } from './SidebarNewProject'
import { ProjectCard } from './ProjectCard'
import { NewDraftCard } from './NewDraftCard'
import './ProjectsSection.css'

const PROJECTS = [
  {
    title: 'Modernist Villa 24',
    description:
      'Visualizing the structural integration of the main atrium with the surrounding glass curtain wall system.',
    taskCount: 12,
    icon: 'layers' as const,
    footerMeta: { type: 'avatars' as const, extraCount: 3 },
  },
  {
    title: 'Urban Loft Renovation',
    description:
      'Reconfiguring the open-plan living space while preserving the original industrial steel beam aesthetic.',
    taskCount: 8,
    icon: 'pencil' as const,
    footerMeta: { type: 'time' as const, label: 'Update 2h ago' },
  },
  {
    title: 'Coastal Retreat',
    description:
      'Developing passive cooling strategies and cross-ventilation paths for the ocean-facing pavilion.',
    taskCount: 15,
    icon: 'building' as const,
    footerMeta: { type: 'overdue' as const },
  },
  {
    title: 'Gallery Extension',
    description:
      'Exploring natural light diffusion for the new exhibition wing without compromising UV protection.',
    taskCount: 5,
    icon: 'compass' as const,
    footerMeta: { type: 'drafting' as const },
  },
]

export function ProjectsSection() {
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
        <SidebarNewProject widthPx={224} />
      </div>

      <div className="projects-section__grid">
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            description={p.description}
            taskCount={p.taskCount}
            icon={p.icon}
            footerMeta={p.footerMeta}
          />
        ))}
        <NewDraftCard />
      </div>
    </section>
  )
}
