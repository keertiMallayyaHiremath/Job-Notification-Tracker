export function Saved() {
  return (
    <div className="page-container">
      <h1 className="page-title">Saved</h1>
      <p className="page-subtitle">Jobs you have bookmarked for later review.</p>
      <div className="empty-state">
        <p className="empty-state-text">
          You have not saved any jobs yet. When you find opportunities worth tracking, they will appear here.
        </p>
      </div>
    </div>
  )
}
