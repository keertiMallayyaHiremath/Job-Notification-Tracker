import type { Job } from '../data/jobs'
import { getMatchScoreColor } from '../utils/matchScore'
import { getJobStatus, setJobStatus, getStatusColor, type JobStatus } from '../utils/jobStatus'
import { useState, useEffect } from 'react'
import './JobCard.css'

interface JobCardProps {
  job: Job
  onView: (job: Job) => void
  onSave: (jobId: string) => void
  onApply: (url: string) => void
  isSaved: boolean
  matchScore?: number
  onStatusChange?: (status: JobStatus) => void
}

export function JobCard({ job, onView, onSave, onApply, isSaved, matchScore, onStatusChange }: JobCardProps) {
  const [status, setStatus] = useState<JobStatus>(() => getJobStatus(job.id))
  const daysText = job.postedDaysAgo === 0 ? 'Today' : job.postedDaysAgo === 1 ? '1 day ago' : `${job.postedDaysAgo} days ago`
  const scoreColor = matchScore !== undefined ? getMatchScoreColor(matchScore) : null
  const statusColor = getStatusColor(status)

  useEffect(() => {
    setStatus(getJobStatus(job.id))
  }, [job.id])

  const handleStatusChange = (newStatus: JobStatus) => {
    setStatus(newStatus)
    setJobStatus(job.id, newStatus)
    if (onStatusChange) {
      onStatusChange(newStatus)
    }
  }

  return (
    <article className="job-card">
      <div className="job-card-header">
        <h3 className="job-card-title">{job.title}</h3>
        <div className="job-card-badges">
          {matchScore !== undefined && (
            <span className={`job-card-match-score job-card-match-score--${scoreColor}`}>
              {matchScore}%
            </span>
          )}
          <span className="job-card-source">{job.source}</span>
        </div>
      </div>
      
      <div className="job-card-company">{job.company}</div>
      
      <div className="job-card-details">
        <span className="job-card-detail">{job.location}</span>
        <span className="job-card-separator">•</span>
        <span className="job-card-detail">{job.mode}</span>
        <span className="job-card-separator">•</span>
        <span className="job-card-detail">{job.experience}</span>
      </div>
      
      <div className="job-card-salary">{job.salaryRange}</div>

      <div className="job-card-status">
        <span className="job-card-status-label">Status:</span>
        <div className="job-card-status-buttons">
          <button
            className={`job-card-status-button job-card-status-button--${statusColor} ${status === 'Not Applied' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Not Applied')}
          >
            Not Applied
          </button>
          <button
            className={`job-card-status-button job-card-status-button--blue ${status === 'Applied' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Applied')}
          >
            Applied
          </button>
          <button
            className={`job-card-status-button job-card-status-button--red ${status === 'Rejected' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Rejected')}
          >
            Rejected
          </button>
          <button
            className={`job-card-status-button job-card-status-button--green ${status === 'Selected' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Selected')}
          >
            Selected
          </button>
        </div>
      </div>
      
      <div className="job-card-footer">
        <span className="job-card-posted">{daysText}</span>
        <div className="job-card-actions">
          <button 
            className="button button-ghost" 
            onClick={() => onView(job)}
          >
            View
          </button>
          <button 
            className={`button ${isSaved ? 'button-secondary' : 'button-ghost'}`}
            onClick={() => onSave(job.id)}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button 
            className="button button-primary" 
            onClick={() => onApply(job.applyUrl)}
          >
            Apply
          </button>
        </div>
      </div>
    </article>
  )
}
