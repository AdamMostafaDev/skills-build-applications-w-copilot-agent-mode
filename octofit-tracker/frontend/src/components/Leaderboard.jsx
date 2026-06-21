import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '../utils/api.js'

const Leaderboard = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      // Codespaces endpoint: https://<codespace-name>-8000.app.github.dev/api/leaderboard
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard`)
        const data = await response.json()
        setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : [])
      } catch (fetchError) {
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <p>Error loading leaderboard: {error.message}</p>

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Data fetched from <code>{getApiBaseUrl()}/api/leaderboard</code></p>
      <ul>
        {entries.map((entry, index) => (
          <li key={entry._id || index}>
            <strong>{entry.userId?.displayName || entry.userId?.username || `User ${index + 1}`}</strong>
            {' '}— Score: {entry.totalScore ?? 'N/A'}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
