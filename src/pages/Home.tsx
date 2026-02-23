import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Stop Missing The Right Jobs.</h1>
        <p className="landing-subtitle">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <button
          className="button button-primary"
          onClick={() => navigate('/settings')}
        >
          Start Tracking
        </button>
      </div>
    </div>
  )
}
