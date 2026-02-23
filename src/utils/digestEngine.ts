import type { Job } from '../data/jobs'
import { calculateMatchScore, type UserPreferences } from './matchScore'

export interface DigestJob {
  id: string
  title: string
  company: string
  location: string
  experience: string
  matchScore: number
  applyUrl: string
}

export interface Digest {
  date: string
  jobs: DigestJob[]
  generatedAt: string
}

export function generateDigest(allJobs: Job[], preferences: UserPreferences | null): Digest | null {
  if (!preferences) return null

  // Calculate match scores for all jobs
  const jobsWithScores = allJobs.map(job => ({
    job,
    matchScore: calculateMatchScore(job, preferences)
  }))

  // Sort by matchScore descending, then postedDaysAgo ascending
  const sortedJobs = jobsWithScores.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore
    }
    return a.job.postedDaysAgo - b.job.postedDaysAgo
  })

  // Take top 10
  const top10 = sortedJobs.slice(0, 10)

  // Create digest
  const today = new Date().toISOString().split('T')[0]
  const digest: Digest = {
    date: today,
    jobs: top10.map(({ job, matchScore }) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      matchScore,
      applyUrl: job.applyUrl
    })),
    generatedAt: new Date().toISOString()
  }

  return digest
}

export function saveDigest(digest: Digest): void {
  const key = `jobTrackerDigest_${digest.date}`
  localStorage.setItem(key, JSON.stringify(digest))
}

export function loadDigest(date: string): Digest | null {
  const key = `jobTrackerDigest_${date}`
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : null
}

export function getTodayDigest(): Digest | null {
  const today = new Date().toISOString().split('T')[0]
  return loadDigest(today)
}

export function formatDigestAsText(digest: Digest): string {
  const dateStr = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  let text = `Top 10 Jobs For You — 9AM Digest\n${dateStr}\n\n`

  digest.jobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title}\n`
    text += `   Company: ${job.company}\n`
    text += `   Location: ${job.location}\n`
    text += `   Experience: ${job.experience}\n`
    text += `   Match Score: ${job.matchScore}%\n`
    text += `   Apply: ${job.applyUrl}\n\n`
  })

  text += 'This digest was generated based on your preferences.\n'

  return text
}

export function createEmailDraft(digest: Digest): string {
  const subject = 'My 9AM Job Digest'
  const body = formatDigestAsText(digest)
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
