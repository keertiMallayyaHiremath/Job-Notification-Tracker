import type { Job } from '../data/jobs'
import './JobModal.css'

interface JobModalProps {
  job: Job | null
  onClose: () => void
}

export function JobModal({ job, onClose }: JobModalProps) {
  if (!job) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{job.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-company">{job.company}</div>
            <div className="modal-meta">
              <span>{job.location}</span>
              <span className="modal-separator">•</span>
              <span>{job.mode}</span>
              <span className="modal-separator">•</span>
              <span>{job.experience}</span>
            </div>
            <div className="modal-salary">{job.salaryRange}</div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Description</h3>
            <p className="modal-description">{job.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Required Skills</h3>
            <div className="modal-skills">
              {job.skills.map((skill) => (
                <span key={skill} className="modal-skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
