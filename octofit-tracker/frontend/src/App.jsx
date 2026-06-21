import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Workouts from './components/Workouts.jsx'
import Leaderboard from './components/Leaderboard.jsx'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/workouts', label: 'Workouts' },
  { path: '/leaderboard', label: 'Leaderboard' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>OctoFit Tracker</h1>
          <nav>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

const Home = () => {
  return (
    <section>
      <h2>OctoFit Tracker</h2>
      <p>Use the navigation links above to inspect users, teams, activities, workouts, and leaderboard data.</p>
      <p>
        This app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build the backend API base URL when running in Codespaces.
        If the variable is not defined, the app falls back to <code>http://localhost:8000</code>.
      </p>
      <p>
        Add <code>VITE_CODESPACE_NAME=your-codespace-name</code> to <code>.env.local</code> to enable Codespaces support.
      </p>
    </section>
  )
}

export default App
