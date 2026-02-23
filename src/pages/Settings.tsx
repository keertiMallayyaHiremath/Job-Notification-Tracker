export function Settings() {
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
            <span className="field-hint">e.g. Product Manager, Designer</span>
          </div>
          <input
            id="role-keywords"
            className="field-input"
            placeholder="Enter role keywords"
          />
        </div>

        <div className="field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="locations">
              Preferred locations
            </label>
            <span className="field-hint">e.g. San Francisco, New York</span>
          </div>
          <input
            id="locations"
            className="field-input"
            placeholder="Enter preferred locations"
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="mode">
            Mode
          </label>
          <select id="mode" className="field-input">
            <option value="">Select mode</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="experience">
            Experience level
          </label>
          <select id="experience" className="field-input">
            <option value="">Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        <div className="button-row">
          <button className="button button-primary" type="button">
            Save Preferences
          </button>
          <button className="button button-secondary" type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
