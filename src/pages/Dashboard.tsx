import { useState, useMemo } from 'react'
import { jobs, type Job } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import { FilterBar } from '../components/FilterBar'
import './Dashboard.css'

export function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs')
    return saved ? JSON.parse(saved) : []
  })

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [mode, setMode] = useState('')
  const [experience, setExperience] = useState('')
  const [source, setSource] = useState('')
  const [sort, setSort] = useState('latest')

  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesKeyword = keyword === '' || 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase())
      
      const matchesLocation = location === '' || job.location === location
      const matchesMode = mode === '' || job.mode === mode
      const matchesExperience = experience === '' || job.experience === experience
      const matchesSource = source === '' || job.source === source

      return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesSource
    })

    if (sort === 'latest') {
      filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
    } else {
      filtered.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
    }

    return filtered
  }, [keyword, location, mode, experience, source, sort])

  const handleSave = (jobId: string) => {
    const newSavedJobs = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
    
    setSavedJobs(newSavedJobs)
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs))
  }

  const handleApply = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      
      <FilterBar
        keyword={keyword}
        location={location}
        mode={mode}
        experience={experience}
        source={source}
        sort={sort}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onModeChange={setMode}
        onExperienceChange={setExperience}
        onSourceChange={setSource}
        onSortChange={setSort}
      />

      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">
            No jobs match your search. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onSave={handleSave}
              onApply={handleApply}
              isSaved={savedJobs.includes(job.id)}
            />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  )
}
