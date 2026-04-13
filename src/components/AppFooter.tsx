import './AppFooter.css'

export function AppFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <p className="app-footer__copy">
        © {year} Architect · Precision Editorial
      </p>
    </footer>
  )
}
