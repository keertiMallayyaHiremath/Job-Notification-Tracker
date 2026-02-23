import { useState, useEffect } from 'react'
import { jobs } from '../data/jobs'
import type { UserPreferences } from '../utils/matchScore'
import { 
  generateDigest, 
  saveDigest, 
  getTodayDigest, 
  formatDigestAsText, 
  createEmailDraft,
  type Digest 
} from '../utils/digestEngine'
import { getMatchScoreColor } from '../utils/matchScore'
import { getStatusUpdates } from '../utils/jobStatus'
import './Digest.css'

export function Digest() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [digest, setDigest] = useState<Digest | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('jobTrackerPreferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }

    // Load existing digest for today
    const todayDigest = getTodayDigest()
    if (todayDigest) {
      setDigest(todayDigest)
    }
  }, [])

  const handleGenerateDigest = () => {
    if (!preferences) return

    // Check if digest already exists for today
    const existing = getTodayDigest()
    if (existing) {
      setDigest(existing)
      return
    }

    // Generate new digest
    const newDigest = generateDigest(jobs, preferences)
    if (newDigest) {
      saveDigest(newDigest)
      setDigest(newDigest)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!digest) return

    const text = formatDigestAsText(digest)
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const handleCreateEmailDraft = () => {
    if (!digest) return
    const mailtoLink = createEmailDraft(digest)
    window.location.href = mailtoLink
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const statusUpdates = getStatusUpdates()
  const recentUpdates = statusUpdates.slice(0, 5)

  if (!preferences) {
    return (
      <div className="page-container">
        <h1 className="page-title">Digest</h1>
        <p className="page-subtitle">Your daily summary of matched opportunities, delivered at 9AM.</p>
        <div className="empty-state">
          <p className="empty-state-text">
            Set preferences to generate a personalized digest.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Digest</h1>
      <p className="page-subtitle">Your daily summary of matched opportunities, delivered at 9AM.</p>

      <div className="digest-demo-note">
        Demo Mode: Daily 9AM trigger simulated manually.
      </div>

      {recentUpdates.length > 0 && (
        <div className="status-updates-section">
          <h2 className="status-updates-title">Recent Status Updates</h2>
          <div className="status-updates-list">
            {recentUpdates.map((update) => {
              const job = jobs.find(j => j.id === update.jobId)
              if (!job) return null
              
              return (
                <div key={`${update.jobId}-${update.updatedAt}`} className="status-update-item">
                  <div className="status-update-info">
                    <div className="status-update-job">{job.title}</div>
                    <div className="status-update-company">{job.company}</div>
                  </div>
                  <div className="status-update-meta">
                    <span className={`status-update-badge status-update-badge--${update.status.toLowerCase().replace(' ', '-')}`}>
                      {update.status}
                    </span>
                    <span className="status-update-date">{formatDateTime(update.updatedAt)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!digest ? (
        <>
          <div className="digest-actions">
            <button 
              className="button button-primary" 
              onClick={handleGenerateDigest}
            >
              Generate Today's 9AM Digest (Simulated)
            </button>
          </div>
          <div className="empty-state">
            <p className="empty-state-text">
              Click the button above to generate your personalized daily digest.
            </p>
          </div>
        </>
      ) : digest.jobs.length === 0 ? (
        <>
          <div className="digest-actions">
            <button 
              className="button button-primary" 
              onClick={handleGenerateDigest}
            >
              Generate Today's 9AM Digest (Simulated)
            </button>
          </div>
          <div className="empty-state">
            <p className="empty-state-text">
              No matching roles today. Check again tomorrow.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="digest-actions">
            <button 
              className="button button-primary" 
              onClick={handleGenerateDigest}
            >
              Regenerate Digest
            </button>
            <button 
              className="button button-secondary" 
              onClick={handleCopyToClipboard}
            >
              {copySuccess ? 'Copied!' : 'Copy Digest to Clipboard'}
            </button>
            <button 
              className="button button-secondary" 
              onClick={handleCreateEmailDraft}
            >
              Create Email Draft
            </button>
          </div>

          <div className="digest-card">
            <div className="digest-header">
              <h2 className="digest-card-title">Top 10 Jobs For You — 9AM Digest</h2>
              <p className="digest-card-date">{formatDate(digest.date)}</p>
            </div>

            <div className="digest-jobs">
              {digest.jobs.map((job, index) => {
                const scoreColor = getMatchScoreColor(job.matchScore)
                return (
                  <div key={job.id} className="digest-job">
                    <div className="digest-job-header">
                      <span className="digest-job-number">{index + 1}</span>
                      <div className="digest-job-info">
                        <h3 className="digest-job-title">{job.title}</h3>
                        <div className="digest-job-company">{job.company}</div>
                      </div>
                      <span className={`digest-job-score digest-job-score--${scoreColor}`}>
                        {job.matchScore}%
                      </span>
                    </div>
                    <div className="digest-job-details">
                      <span>{job.location}</span>
                      <span className="digest-job-separator">•</span>
                      <span>{job.experience}</span>
                    </div>
                    <button 
                      className="button button-primary digest-job-apply"
                      onClick={() => window.open(job.applyUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Apply
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="digest-footer">
              This digest was generated based on your preferences.
            </div>
          </div>
        </>
      )}
    </div>
  )
}
