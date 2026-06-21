import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '../utils/api.js'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      // Codespaces endpoint: https://<codespace-name>-8000.app.github.dev/api/teams
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams`)
        const data = await response.json()
        setTeams(Array.isArray(data.teams) ? data.teams : [])
      } catch (fetchError) {
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <p>Loading teams...</p>
  if (error) return <p>Error loading teams: {error.message}</p>

  return (
    <section>
      <h2>Teams</h2>
      <p>Data fetched from <code>{getApiBaseUrl()}/api/teams</code></p>
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.name}>
            <strong>{team.name}</strong> — {team.description}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
