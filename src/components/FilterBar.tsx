import './FilterBar.css'

interface FilterBarProps {
  keyword: string
  location: string
  mode: string
  experience: string
  source: string
  sort: string
  status?: string
  onKeywordChange: (value: string) => void
  onLocationChange: (value: string) => void
  onModeChange: (value: string) => void
  onExperienceChange: (value: string) => void
  onSourceChange: (value: string) => void
  onSortChange: (value: string) => void
  onStatusChange?: (value: string) => void
}

export function FilterBar({
  keyword,
  location,
  mode,
  experience,
  source,
  sort,
  status,
  onKeywordChange,
  onLocationChange,
  onModeChange,
  onExperienceChange,
  onSourceChange,
  onSortChange,
  onStatusChange
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-row">
        <input
          type="text"
          className="filter-input filter-search"
          placeholder="Search by title or company"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>
      
      <div className="filter-row">
        <select
          className="filter-select"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Noida">Noida</option>
          <option value="Mysore">Mysore</option>
        </select>

        <select
          className="filter-select"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <option value="">All Modes</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>

        <select
          className="filter-select"
          value={experience}
          onChange={(e) => onExperienceChange(e.target.value)}
        >
          <option value="">All Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
        </select>

        <select
          className="filter-select"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
          <option value="Indeed">Indeed</option>
        </select>

        {onStatusChange && (
          <select
            className="filter-select"
            value={status || ''}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        )}

        <select
          className="filter-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="matchScore">Match Score</option>
          <option value="salary">Salary</option>
        </select>
      </div>
    </div>
  )
}
