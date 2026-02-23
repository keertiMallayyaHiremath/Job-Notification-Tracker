import { useState, useMemo } from 'react'
import { jobs, type Job } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import { Toast } from '../components/Toast'
import type { JobStatus } from '../utils/jobStatus'
import '../pages/Dashboard.css'

export function Saved() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs')
    return saved ? JSON.parse(saved) : []
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const savedJobsList = useMemo(() => {
    return jobs.filter(job => savedJobs.includes(job.id))
  }, [savedJobs])

  const handleSave = (jobId: string) => {
    const newSavedJobs = savedJobs.filter(id => id !== jobId)
    setSavedJobs(newSavedJobs)
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs))
  }

  const handleApply = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleStatusChange = (newStatus: JobStatus) => {
    setToastMessage(`Status updated: ${newStatus}`)
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Saved</h1>
      <p className="page-subtitle">Jobs you have bookmarked for later review.</p>
      
      {savedJobsList.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">
            You have not saved any jobs yet. When you find opportunities worth tracking, they will appear here.
          </p>
        </div>
      ) : (
        <div className="jobs-grid">
          {savedJobsList.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onSave={handleSave}
              onApply={handleApply}
              isSaved={true}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  )
}
