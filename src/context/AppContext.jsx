import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const saved = localStorage.getItem('tripbro_user')
    if (saved) setUser(JSON.parse(saved))
    const savedTrips = localStorage.getItem('tripbro_trips')
    if (savedTrips) setTrips(JSON.parse(savedTrips))
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('tripbro_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tripbro_user')
  }

  const saveTrip = (trip) => {
    const updated = [trip, ...trips.filter(t => t.id !== trip.id)]
    setTrips(updated)
    localStorage.setItem('tripbro_trips', JSON.stringify(updated))
    return trip
  }

  const deleteTrip = (id) => {
    const updated = trips.filter(t => t.id !== id)
    setTrips(updated)
    localStorage.setItem('tripbro_trips', JSON.stringify(updated))
  }

  return (
    <AppContext.Provider value={{ user, login, logout, trips, saveTrip, deleteTrip, loading, setLoading, currency, setCurrency }}>
      {children}
    </AppContext.Provider>
  )
}
