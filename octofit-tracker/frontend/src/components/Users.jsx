import { useEffect, useState } from 'react'
import { getApiBaseUrl } from '../utils/api.js'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users`)
        const data = await response.json()
        setUsers(Array.isArray(data.users) ? data.users : [])
      } catch (fetchError) {
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error loading users: {error.message}</p>

  return (
    <section>
      <h2>Users</h2>
      <p>Data fetched from <code>{getApiBaseUrl()}/api/users</code></p>
      <ul>
        {users.map((user) => (
          <li key={user._id || user.username}>
            <strong>{user.displayName || user.username}</strong> — {user.bio}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
