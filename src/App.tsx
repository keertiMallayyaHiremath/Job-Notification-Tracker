function App() {
  return (
    <div className="app-shell">
      <header className="app-top-bar">
        <div className="app-top-bar-left">Job Notification App</div>
        <div className="app-top-bar-center">Step 1 / 4</div>
        <div className="app-top-bar-right">
          <span className="status-badge status-badge--not-started">
            Not Started
          </span>
        </div>
      </header>

      <section className="context-header">
        <div className="prose">
          <h1 className="context-header-title">Design system foundation</h1>
          <p className="context-header-subtitle">
            Establish the visual and interaction language for the Job
            Notification App before adding any product logic.
          </p>
        </div>
      </section>

      <main className="app-main">
        <section className="primary-workspace">
          <article className="card">
            <header className="card-header">
              <h2 className="card-title">Workspace canvas</h2>
              <p className="card-subtitle">
                A calm, structured surface for assembling job notification
                flows and reviewing system states.
              </p>
            </header>
            <div className="card-body">
              <div className="stack-vertical">
                <div className="state-surface state-surface--warning">
                  <div className="state-title">Empty state</div>
                  <p className="state-body">
                    This workspace does not contain any job notification flows
                    yet. When you are ready, start by defining how and when
                    candidates should be notified.
                  </p>
                </div>
                <p className="prose">
                  Empty states should guide the next meaningful action without
                  adding urgency or blame. Keep language neutral, specific, and
                  action oriented.
                </p>
              </div>
            </div>
          </article>

          <article className="card">
            <header className="card-header">
              <h2 className="card-title">Error & validation patterns</h2>
              <p className="card-subtitle">
                Errors explain what happened and how to recover, without
                assigning fault to the user.
              </p>
            </header>
            <div className="card-body stack-vertical">
              <div className="field field--error">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="sample-input">
                    Sample input
                  </label>
                  <span className="field-hint">Used to illustrate errors</span>
                </div>
                <input
                  id="sample-input"
                  className="field-input"
                  placeholder="Placeholder text"
                />
                <p className="field-error">
                  This value is incomplete. Provide a clear, specific example so
                  the system can generate a reliable notification.
                </p>
              </div>

              <div className="state-surface state-surface--error">
                <div className="state-title">System error message</div>
                <p className="state-body">
                  We could not save these changes due to a temporary issue on
                  our side. Wait a moment, then try again. If this continues,
                  you can safely refresh the page without losing your latest
                  edits.
                </p>
              </div>
            </div>
          </article>
        </section>

        <aside className="secondary-panel">
          <article className="card">
            <header className="card-header">
              <h2 className="card-title">Step context</h2>
              <p className="card-subtitle">
                Clarify what this step is responsible for and what comes next.
              </p>
            </header>
            <div className="card-body stack-vertical">
              <p className="prose">
                Use this panel to keep the builder grounded: what problem is
                being solved, what constraints apply, and what a good outcome
                looks like. Keep the copy concise and free of hype.
              </p>
              <div className="state-surface state-surface--success">
                <div className="state-title">Design principle</div>
                <p className="state-body">
                  Prefer fewer, well-structured components over many one-off
                  variations. Consistency builds trust.
                </p>
              </div>
            </div>
          </article>

          <article className="card">
            <header className="card-header">
              <h2 className="card-title">Copyable prompt</h2>
              <p className="card-subtitle">
                A reusable pattern for prompt-like text a user may copy into
                another tool.
              </p>
            </header>
            <div className="card-body stack-vertical">
              <div className="prompt-box">
                <div className="prompt-box-header">
                  <span className="prompt-box-label">Prompt</span>
                  <button className="button button-secondary" type="button">
                    Copy
                  </button>
                </div>
                <div>
                  Design a calm, coherent notification experience for job
                  candidates. Prioritise clarity over urgency. Avoid hype and
                  keep each message focused on a single decision or next step.
                </div>
              </div>
              <div className="button-row">
                <button className="button button-primary" type="button">
                  Mark step as ready
                </button>
                <button className="button button-secondary" type="button">
                  Save without changes
                </button>
              </div>
            </div>
          </article>
        </aside>
      </main>

      <footer className="proof-footer">
        <div className="proof-footer-checklist">
          <div className="proof-item">
            <div className="proof-box" />
            <span className="proof-label">UI Built</span>
          </div>
          <div className="proof-item">
            <div className="proof-box" />
            <span className="proof-label">Logic Working</span>
          </div>
          <div className="proof-item">
            <div className="proof-box" />
            <span className="proof-label">Test Passed</span>
          </div>
          <div className="proof-item">
            <div className="proof-box" />
            <span className="proof-label">Deployed</span>
          </div>
        </div>
        <div className="tag">Design system foundation</div>
      </footer>
    </div>
  )
}

export default App
