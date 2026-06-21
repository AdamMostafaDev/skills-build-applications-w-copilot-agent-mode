import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '../utils/api.js'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      // Codespaces endpoint: https://<codespace-name>-8000.app.github.dev/api/activities
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities`)
        const data = await response.json()
        setActivities(Array.isArray(data.activities) ? data.activities : [])
      } catch (fetchError) {
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <p>Loading activities...</p>
  if (error) return <p>Error loading activities: {error.message}</p>

  return (
    <section>
      <h2>Activities</h2>
      <p>Data fetched from <code>{getApiBaseUrl()}/api/activities</code></p>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <strong>{activity.type}</strong> — {activity.description || 'No description'}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
