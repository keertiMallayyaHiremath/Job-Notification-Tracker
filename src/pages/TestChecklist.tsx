import { useState, useEffect } from 'react'
import './TestChecklist.css'

interface TestItem {
  id: string
  label: string
  tooltip: string
}

const testItems: TestItem[] = [
  {
    id: 'preferences-persist',
    label: 'Preferences persist after refresh',
    tooltip: 'Set preferences in /settings, refresh page, verify they are still there'
  },
  {
    id: 'match-score-calculates',
    label: 'Match score calculates correctly',
    tooltip: 'Set preferences, check job cards show match score badges with correct percentages'
  },
  {
    id: 'show-only-matches',
    label: '"Show only matches" toggle works',
    tooltip: 'Enable toggle on /dashboard, verify only jobs above threshold are shown'
  },
  {
    id: 'save-job-persists',
    label: 'Save job persists after refresh',
    tooltip: 'Save a job, refresh page, verify it appears in /saved'
  },
  {
    id: 'apply-opens-new-tab',
    label: 'Apply opens in new tab',
    tooltip: 'Click Apply button on any job card, verify it opens in new tab'
  },
  {
    id: 'status-update-persists',
    label: 'Status update persists after refresh',
    tooltip: 'Change job status to Applied, refresh page, verify status is still Applied'
  },
  {
    id: 'status-filter-works',
    label: 'Status filter works correctly',
    tooltip: 'Set some jobs to Applied, filter by Applied status, verify only those jobs show'
  },
  {
    id: 'digest-generates-top-10',
    label: 'Digest generates top 10 by score',
    tooltip: 'Generate digest on /digest, verify it shows 10 jobs sorted by match score'
  },
  {
    id: 'digest-persists-daily',
    label: 'Digest persists for the day',
    tooltip: 'Generate digest, refresh page, verify same digest loads without regenerating'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on main pages',
    tooltip: 'Open browser console, navigate through all pages, verify no errors appear'
  }
]

export function TestChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('jobTrackerTestStatus')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('jobTrackerTestStatus', JSON.stringify(checkedItems))
  }, [checkedItems])

  const handleToggle = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all test status?')) {
      setCheckedItems({})
      localStorage.removeItem('jobTrackerTestStatus')
    }
  }

  const passedCount = Object.values(checkedItems).filter(Boolean).length
  const totalCount = testItems.length
  const allPassed = passedCount === totalCount

  return (
    <div className="page-container">
      <h1 className="page-title">Test Checklist</h1>
      <p className="page-subtitle">Verify all features before shipping.</p>

      <div className="test-summary">
        <div className="test-summary-count">
          Tests Passed: <span className={allPassed ? 'test-summary-count--complete' : ''}>{passedCount} / {totalCount}</span>
        </div>
        {!allPassed && (
          <div className="test-summary-warning">
            Resolve all issues before shipping.
          </div>
        )}
      </div>

      <div className="test-checklist">
        {testItems.map((item) => (
          <div key={item.id} className="test-item">
            <label className="test-item-label">
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={() => handleToggle(item.id)}
                className="test-item-checkbox"
              />
              <span className="test-item-text">{item.label}</span>
            </label>
            <div className="test-item-tooltip">
              <span className="test-item-tooltip-icon">?</span>
              <div className="test-item-tooltip-content">
                {item.tooltip}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="test-actions">
        <button className="button button-secondary" onClick={handleReset}>
          Reset Test Status
        </button>
      </div>
    </div>
  )
}
