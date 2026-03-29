import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import Itinerary from './pages/Itinerary'
import Trips from './pages/Trips'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Budget from './pages/Budget'

function ProtectedRoute({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/auth/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useApp()
  return !user ? children : <Navigate to="/dashboard" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/auth/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/trip/create" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
      <Route path="/trip/itinerary/:id" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
      <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/budget/:tripId" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
