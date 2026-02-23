import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navigation">
      <button
        className="navigation-hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`navigation-links ${isMenuOpen ? 'navigation-links--open' : ''}`}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `navigation-link ${isActive ? 'navigation-link--active' : ''}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `navigation-link ${isActive ? 'navigation-link--active' : ''}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Saved
        </NavLink>
        <NavLink
          to="/digest"
          className={({ isActive }) =>
            `navigation-link ${isActive ? 'navigation-link--active' : ''}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Digest
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `navigation-link ${isActive ? 'navigation-link--active' : ''}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Settings
        </NavLink>
        <NavLink
          to="/proof"
          className={({ isActive }) =>
            `navigation-link ${isActive ? 'navigation-link--active' : ''}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Proof
        </NavLink>
      </div>
    </nav>
  )
}
