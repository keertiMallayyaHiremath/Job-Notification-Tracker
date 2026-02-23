import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ship.css'

export function Ship() {
  const navigate = useNavigate()
  const [allTestsPassed, setAllTestsPassed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jobTrackerTestStatus')
      if (saved) {
        const checkedItems = JSON.parse(saved)
        const checkedCount = Object.values(checkedItems).filter(Boolean).length
        setAllTestsPassed(checkedCount === 10)
      }
    } catch {
      setAllTestsPassed(false)
    }
  }, [])

  if (!allTestsPassed) {
    return (
      <div className="page-container">
        <div className="ship-locked">
          <div className="ship-locked-icon">🔒</div>
          <h1 className="ship-locked-title">Shipping Locked</h1>
          <p className="ship-locked-message">
            Complete all tests before shipping.
          </p>
          <button 
            className="button button-primary"
            onClick={() => navigate('/jt/07-test')}
          >
            Go to Test Checklist
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="ship-ready">
        <div className="ship-ready-icon">✅</div>
        <h1 className="ship-ready-title">Ready to Ship!</h1>
        <p className="ship-ready-message">
          All tests have passed. Your Job Notification Tracker is ready for production.
        </p>
        <div className="ship-ready-features">
          <h2 className="ship-ready-features-title">Features Delivered:</h2>
          <ul className="ship-ready-features-list">
            <li>Premium Design System with off-white background and deep red accent</li>
            <li>60 realistic Indian tech jobs dataset</li>
            <li>Intelligent match scoring engine (deterministic)</li>
            <li>User preferences with localStorage persistence</li>
            <li>Advanced filtering (keyword, location, mode, experience, source, status)</li>
            <li>Job status tracking (Not Applied, Applied, Rejected, Selected)</li>
            <li>Saved jobs with persistence</li>
            <li>Daily digest engine with email export</li>
            <li>Toast notifications for status updates</li>
            <li>Recent status updates timeline</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
