import { useState, useEffect } from 'react'
import type { UserPreferences } from '../utils/matchScore'

export function Settings() {
  const [roleKeywords, setRoleKeywords] = useState('')
  const [preferredLocations, setPreferredLocations] = useState<string[]>([])
  const [preferredMode, setPreferredMode] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState('')
  const [skills, setSkills] = useState('')
  const [minMatchScore, setMinMatchScore] = useState(40)

  useEffect(() => {
    const saved = localStorage.getItem('jobTrackerPreferences')
    if (saved) {
      const prefs: UserPreferences = JSON.parse(saved)
      setRoleKeywords(prefs.roleKeywords.join(', '))
      setPreferredLocations(prefs.preferredLocations)
      setPreferredMode(prefs.preferredMode)
      setExperienceLevel(prefs.experienceLevel)
      setSkills(prefs.skills.join(', '))
      setMinMatchScore(prefs.minMatchScore)
    }
  }, [])

  const handleSave = () => {
    const preferences: UserPreferences = {
      roleKeywords: roleKeywords.split(',').map(k => k.trim()).filter(k => k),
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills: skills.split(',').map(s => s.trim()).filter(s => s),
      minMatchScore
    }
    localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences))
    alert('Preferences saved successfully!')
  }

  const handleReset = () => {
    setRoleKeywords('')
    setPreferredLocations([])
    setPreferredMode([])
    setExperienceLevel('')
    setSkills('')
    setMinMatchScore(40)
    localStorage.removeItem('jobTrackerPreferences')
  }

  const handleLocationChange = (location: string) => {
    setPreferredLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  const handleModeChange = (mode: string) => {
    setPreferredMode(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Configure your job tracking preferences.</p>

      <div className="settings-form">
        <div className="field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="role-keywords">
              Role keywords
            </label>
            <span className="field-hint">Comma-separated, e.g. Developer, Engineer</span>
          </div>
          <input
            id="role-keywords"
            className="field-input"
            placeholder="Enter role keywords"
            value={roleKeywords}
            onChange={(e) => setRoleKeywords(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Preferred locations</label>
          <div className="checkbox-group">
            {['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai', 'Noida', 'Mysore'].map(location => (
              <label key={location} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={preferredLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                />
                <span>{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">Preferred mode</label>
          <div className="checkbox-group">
            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
              <label key={mode} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={preferredMode.includes(mode)}
                  onChange={() => handleModeChange(mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="experience">
            Experience level
          </label>
          <select 
            id="experience" 
            className="field-input"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Select experience level</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
          </select>
        </div>

        <div className="field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="skills">
              Skills
            </label>
            <span className="field-hint">Comma-separated, e.g. React, Node.js</span>
          </div>
          <input
            id="skills"
            className="field-input"
            placeholder="Enter your skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="min-match-score">
              Minimum match score
            </label>
            <span className="field-hint">{minMatchScore}%</span>
          </div>
          <input
            id="min-match-score"
            type="range"
            min="0"
            max="100"
            step="5"
            className="field-slider"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
          />
        </div>

        <div className="button-row">
          <button className="button button-primary" type="button" onClick={handleSave}>
            Save Preferences
          </button>
          <button className="button button-secondary" type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
