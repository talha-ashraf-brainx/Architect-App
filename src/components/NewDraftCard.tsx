import './NewDraftCard.css'

type NewDraftCardProps = {
  onClick?: () => void
}

export function NewDraftCard({ onClick }: NewDraftCardProps) {
  return (
    <button type="button" className="new-draft-card" onClick={onClick}>
      <span className="new-draft-card__plus-wrap" aria-hidden>
        <span className="new-draft-card__plus">+</span>
      </span>
      <span className="new-draft-card__title">Initialize New Draft</span>
      <span className="new-draft-card__subtitle">
        Start from a template or blank canvas
      </span>
    </button>
  )
}
