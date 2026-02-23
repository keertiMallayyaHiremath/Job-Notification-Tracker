import { useState, useMemo, useEffect } from 'react'
import { jobs, type Job } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import { FilterBar } from '../components/FilterBar'
import { calculateMatchScore, type UserPreferences } from '../utils/matchScore'
import './Dashboard.css'

interface JobWithScore extends Job {
  matchScore: number
}

export function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs')
    return saved ? JSON.parse(saved) : []
  })

  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [mode, setMode] = useState('')
  const [experience, setExperience] = useState('')
  const [source, setSource] = useState('')
  const [sort, setSort] = useState('latest')

  useEffect(() => {
    const saved = localStorage.getItem('jobTrackerPreferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  const jobsWithScores = useMemo<JobWithScore[]>(() => {
    return jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences)
    }))
  }, [preferences])

  const filteredJobs = useMemo(() => {
    let filtered = jobsWithScores.filter((job) => {
      const matchesKeyword = keyword === '' || 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase())
      
      const matchesLocation = location === '' || job.location === location
      const matchesMode = mode === '' || job.mode === mode
      const matchesExperience = experience === '' || job.experience === experience
      const matchesSource = source === '' || job.source === source

      const matchesThreshold = !showOnlyMatches || 
        (preferences && job.matchScore >= preferences.minMatchScore)

      return matchesKeyword && matchesLocation && matchesMode && 
             matchesExperience && matchesSource && matchesThreshold
    })

    if (sort === 'latest') {
      filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
    } else if (sort === 'oldest') {
      filtered.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo)
    } else if (sort === 'matchScore') {
      filtered.sort((a, b) => b.matchScore - a.matchScore)
    } else if (sort === 'salary') {
      filtered.sort((a, b) => {
        const extractNumber = (str: string) => {
          const match = str.match(/(\d+)/)
          return match ? parseInt(match[1]) : 0
        }
        return extractNumber(b.salaryRange) - extractNumber(a.salaryRange)
      })
    }

    return filtered
  }, [jobsWithScores, keyword, location, mode, experience, source, sort, showOnlyMatches, preferences])

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
      
      {!preferences && (
        <div className="banner">
          Set your preferences to activate intelligent matching.
        </div>
      )}

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

      {preferences && (
        <div className="match-toggle">
          <label className="match-toggle-label">
            <input
              type="checkbox"
              checked={showOnlyMatches}
              onChange={(e) => setShowOnlyMatches(e.target.checked)}
            />
            <span>Show only jobs above my threshold ({preferences.minMatchScore}%)</span>
          </label>
        </div>
      )}

      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">
            {showOnlyMatches 
              ? 'No roles match your criteria. Adjust filters or lower threshold.'
              : 'No jobs match your search. Try adjusting your filters.'}
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
              matchScore={preferences ? job.matchScore : undefined}
            />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  )
}
