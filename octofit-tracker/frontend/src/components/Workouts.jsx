import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '../utils/api.js'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true)
      // Codespaces endpoint: https://<codespace-name>-8000.app.github.dev/api/workouts
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts`)
        const data = await response.json()
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : [])
      } catch (fetchError) {
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p>Error loading workouts: {error.message}</p>

  return (
    <section>
      <h2>Workouts</h2>
      <p>Data fetched from <code>{getApiBaseUrl()}/api/workouts</code></p>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.name}</strong> — {workout.description}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
