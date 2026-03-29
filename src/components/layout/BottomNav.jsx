import { NavLink } from 'react-router-dom'
import { Home, Compass, MapPin, User } from 'lucide-react'

const tabs = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/trips', icon: MapPin, label: 'My Trips' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-4">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-ocean scale-110'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg transition-all ${isActive ? 'bg-ocean/10' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`text-xs font-display font-medium ${isActive ? 'text-ocean' : ''}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
