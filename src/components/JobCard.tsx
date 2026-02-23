import type { Job } from '../data/jobs'
import { getMatchScoreColor } from '../utils/matchScore'
import './JobCard.css'

interface JobCardProps {
  job: Job
  onView: (job: Job) => void
  onSave: (jobId: string) => void
  onApply: (url: string) => void
  isSaved: boolean
  matchScore?: number
}

export function JobCard({ job, onView, onSave, onApply, isSaved, matchScore }: JobCardProps) {
  const daysText = job.postedDaysAgo === 0 ? 'Today' : job.postedDaysAgo === 1 ? '1 day ago' : `${job.postedDaysAgo} days ago`
  const scoreColor = matchScore !== undefined ? getMatchScoreColor(matchScore) : null

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
