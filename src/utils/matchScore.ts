import type { Job } from '../data/jobs'

export interface UserPreferences {
  roleKeywords: string[]
  preferredLocations: string[]
  preferredMode: string[]
  experienceLevel: string
  skills: string[]
  minMatchScore: number
}

export function calculateMatchScore(job: Job, preferences: UserPreferences | null): number {
  if (!preferences) return 0

  let score = 0

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  const titleLower = job.title.toLowerCase()
  const titleMatch = preferences.roleKeywords.some(keyword => 
    titleLower.includes(keyword.toLowerCase().trim())
  )
  if (titleMatch) score += 25

  // +15 if any roleKeyword appears in job.description
  const descriptionLower = job.description.toLowerCase()
  const descriptionMatch = preferences.roleKeywords.some(keyword => 
    descriptionLower.includes(keyword.toLowerCase().trim())
  )
  if (descriptionMatch) score += 15

  // +15 if job.location matches preferredLocations
  if (preferences.preferredLocations.length > 0 && 
      preferences.preferredLocations.includes(job.location)) {
    score += 15
  }

  // +10 if job.mode matches preferredMode
  if (preferences.preferredMode.length > 0 && 
      preferences.preferredMode.includes(job.mode)) {
    score += 10
  }

  // +10 if job.experience matches experienceLevel
  if (preferences.experienceLevel && 
      job.experience === preferences.experienceLevel) {
    score += 10
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (preferences.skills.length > 0) {
    const userSkillsLower = preferences.skills.map(s => s.toLowerCase().trim())
    const jobSkillsLower = job.skills.map(s => s.toLowerCase())
    const hasSkillMatch = userSkillsLower.some(userSkill => 
      jobSkillsLower.some(jobSkill => jobSkill.includes(userSkill))
    )
    if (hasSkillMatch) score += 15
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5
  }

  // Cap score at 100
  return Math.min(score, 100)
}

export function getMatchScoreColor(score: number): string {
  if (score >= 80) return 'green'
  if (score >= 60) return 'amber'
  if (score >= 40) return 'neutral'
  return 'grey'
}
