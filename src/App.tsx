import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { Saved } from './pages/Saved'
import { Digest } from './pages/Digest'
import { Proof } from './pages/Proof'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="saved" element={<Saved />} />
          <Route path="digest" element={<Digest />} />
          <Route path="proof" element={<Proof />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
