import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Calendar, DollarSign, Trash2, ChevronRight, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'

export default function Trips() {
  const navigate = useNavigate()
  const { trips, deleteTrip } = useApp()
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = trips.filter(t =>
    t.destination?.toLowerCase().includes(search.toLowerCase())
  )

  const now = new Date()
  const upcoming = filtered.filter(t => new Date(t.startDate) >= now)
  const past = filtered.filter(t => new Date(t.startDate) < now)

  const TripCard = ({ trip }) => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover">
      <button onClick={() => navigate(`/trip/itinerary/${trip.id}`)} className="w-full text-left">
        <div className="h-28 bg-gradient-to-br from-ocean/30 to-sunset/30 flex items-center justify-center text-5xl">
          🌍
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-gray-900 truncate">{trip.destination}</h3>
          <p className="text-gray-400 text-xs font-body flex items-center gap-1 mt-1">
            <Calendar size={11} /> {trip.startDate} → {trip.endDate}
          </p>
          <p className="text-sunset font-display font-semibold text-sm mt-1 flex items-center gap-1">
            <DollarSign size={13} /> {trip.budget?.total || trip.budget} budget
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs bg-ocean/10 text-ocean font-display font-medium px-2 py-1 rounded-full capitalize">
              {trip.travelStyle || 'General'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); setConfirmDelete(trip.id) }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <Header title="My Trips"
        rightAction={
          <button onClick={() => navigate('/trip/create')} className="p-2 rounded-xl bg-ocean text-white">
            <Plus size={18} />
          </button>
        }
      />

      <div className="max-w-lg mx-auto px-6 py-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean transition-all text-sm"
          />
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="font-display font-bold text-gray-700 mb-2">No trips yet</h3>
            <p className="text-gray-400 font-body text-sm mb-8">Create your first AI-powered trip plan!</p>
            <button onClick={() => navigate('/trip/create')}
              className="bg-ocean text-white font-display font-bold px-8 py-3.5 rounded-2xl hover:bg-ocean-dark transition-colors">
              Plan My First Trip ✈️
            </button>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <section className="mb-8">
                <h2 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Upcoming ({upcoming.length})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {upcoming.map(trip => <TripCard key={trip.id} trip={trip} />)}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-300 rounded-full" />
                  Past Trips ({past.length})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {past.map(trip => <TripCard key={trip.id} trip={trip} />)}
                </div>
              </section>
            )}

            {filtered.length === 0 && search && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500 font-body">No trips matching "{search}"</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="font-display font-bold text-gray-900 text-lg mb-2">Delete trip?</h3>
            <p className="text-gray-500 font-body text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 bg-gray-100 text-gray-700 font-display font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => { deleteTrip(confirmDelete); setConfirmDelete(null) }}
                className="flex-1 bg-red-500 text-white font-display font-semibold py-3 rounded-2xl hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
