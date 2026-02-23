export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected'

export interface JobStatusRecord {
  jobId: string
  status: JobStatus
  updatedAt: string
}

export function getJobStatus(jobId: string): JobStatus {
  try {
    const statuses = localStorage.getItem('jobTrackerStatus')
    if (!statuses) return 'Not Applied'
    
    const parsed = JSON.parse(statuses)
    return parsed[jobId] || 'Not Applied'
  } catch {
    return 'Not Applied'
  }
}

export function setJobStatus(jobId: string, status: JobStatus): void {
  try {
    const statuses = localStorage.getItem('jobTrackerStatus')
    const parsed = statuses ? JSON.parse(statuses) : {}
    
    parsed[jobId] = status
    localStorage.setItem('jobTrackerStatus', JSON.stringify(parsed))
    
    // Track status change history
    if (status !== 'Not Applied') {
      addStatusUpdate(jobId, status)
    }
  } catch (error) {
    console.error('Failed to save job status:', error)
  }
}

export function addStatusUpdate(jobId: string, status: JobStatus): void {
  try {
    const updates = localStorage.getItem('jobTrackerStatusUpdates')
    const parsed: JobStatusRecord[] = updates ? JSON.parse(updates) : []
    
    // Add new update
    parsed.unshift({
      jobId,
      status,
      updatedAt: new Date().toISOString()
    })
    
    // Keep only last 20 updates
    const trimmed = parsed.slice(0, 20)
    localStorage.setItem('jobTrackerStatusUpdates', JSON.stringify(trimmed))
  } catch (error) {
    console.error('Failed to save status update:', error)
  }
}

export function getStatusUpdates(): JobStatusRecord[] {
  try {
    const updates = localStorage.getItem('jobTrackerStatusUpdates')
    return updates ? JSON.parse(updates) : []
  } catch {
    return []
  }
}

export function getStatusColor(status: JobStatus): string {
  switch (status) {
    case 'Applied':
      return 'blue'
    case 'Rejected':
      return 'red'
    case 'Selected':
      return 'green'
    default:
      return 'neutral'
  }
}
