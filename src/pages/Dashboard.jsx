import { useNavigate } from 'react-router-dom'
import { Plus, MapPin, Calendar, ChevronRight, Compass, TrendingUp, Sparkles, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'

const popularDests = [
  { name: 'Tokyo', country: 'Japan', emoji: '🏯', tag: 'Cultural', color: 'from-pink-400 to-red-400' },
  { name: 'Paris', country: 'France', emoji: '🗼', tag: 'Romantic', color: 'from-blue-400 to-purple-400' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌺', tag: 'Beach', color: 'from-green-400 to-teal-400' },
  { name: 'New York', country: 'USA', emoji: '🗽', tag: 'City', color: 'from-gray-500 to-gray-700' },
  { name: 'Safari', country: 'Kenya', emoji: '🦁', tag: 'Nature', color: 'from-yellow-500 to-orange-500' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, trips } = useApp()

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date())
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <Header />

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-6">
        {/* Greeting */}
        <div className="fade-up">
          <p className="text-gray-500 font-body text-sm">{greeting} 👋</p>
          <h1 className="font-display font-black text-2xl text-gray-900 mt-0.5">
            Hello, {user?.name?.split(' ')[0] || 'Traveler'}!
          </h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 fade-up" style={{ animationDelay: '0.05s' }}>
          {[
            { label: 'Total Trips', value: trips.length, icon: MapPin, color: 'text-ocean' },
            { label: 'Upcoming', value: upcomingTrips.length, icon: Calendar, color: 'text-sunset' },
            { label: 'Countries', value: new Set(trips.map(t => t.destination?.split(',').pop()?.trim())).size || 0, icon: TrendingUp, color: 'text-green-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
              <Icon size={18} className={color} />
              <p className="font-display font-bold text-2xl text-gray-900 mt-1">{value}</p>
              <p className="text-gray-500 text-xs font-body mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Create Trip CTA */}
        <div className="bg-gradient-to-br from-ocean to-[#005a8e] rounded-3xl p-6 text-white fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-yellow-300" />
                <span className="text-white/80 text-xs font-body">AI-Powered</span>
              </div>
              <h2 className="font-display font-bold text-xl mb-1">Plan a new trip</h2>
              <p className="text-white/70 text-sm font-body leading-relaxed">Get a full itinerary in under 30 seconds</p>
            </div>
            <span className="text-4xl">✈️</span>
          </div>
          <button
            onClick={() => navigate('/trip/create')}
            className="mt-4 bg-white text-ocean font-display font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-sand transition-colors text-sm"
          >
            <Plus size={16} />
            Create New Trip
          </button>
        </div>

        {/* Recent Trips */}
        {trips.length > 0 && (
          <div className="fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-lg text-gray-900">My Trips</h2>
              <button onClick={() => navigate('/trips')} className="text-ocean text-sm font-display font-medium flex items-center gap-1">
                See all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {trips.slice(0, 3).map(trip => (
                <button
                  key={trip.id}
                  onClick={() => navigate(`/trip/itinerary/${trip.id}`)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left card-hover"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ocean/20 to-sunset/20 flex items-center justify-center text-2xl flex-shrink-0">
                    🌍
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-gray-900 truncate">{trip.destination}</h3>
                    <p className="text-gray-500 text-xs font-body mt-0.5 flex items-center gap-1">
                      <Calendar size={11} /> {trip.startDate} → {trip.endDate}
                    </p>
                    <p className="text-sunset text-xs font-display font-medium mt-1">${trip.budget} budget</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Discover */}
        <div className="fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-lg text-gray-900">Discover</h2>
            <button onClick={() => navigate('/explore')} className="text-ocean text-sm font-display font-medium flex items-center gap-1">
              Explore <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {popularDests.map(dest => (
              <button
                key={dest.name}
                onClick={() => navigate('/trip/create')}
                className="flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-40 text-left"
              >
                <div className={`h-24 bg-gradient-to-br ${dest.color} flex items-center justify-center text-4xl`}>
                  {dest.emoji}
                </div>
                <div className="p-3">
                  <p className="font-display font-semibold text-gray-900 text-sm">{dest.name}</p>
                  <p className="text-gray-500 text-xs font-body">{dest.country}</p>
                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-body">
                    {dest.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {trips.length === 0 && (
          <div className="text-center py-8 fade-up">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="font-display font-bold text-gray-700 mb-2">No trips yet</h3>
            <p className="text-gray-500 font-body text-sm mb-6">Create your first AI-powered itinerary!</p>
            <button onClick={() => navigate('/trip/create')}
              className="bg-ocean text-white font-display font-bold px-8 py-3 rounded-2xl hover:bg-ocean-dark transition-colors">
              Plan My First Trip
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
