import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-top-bar">
        <div className="app-top-bar-left">Job Notification App</div>
        <Navigation />
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
