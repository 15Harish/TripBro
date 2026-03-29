import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, TrendingUp, Compass } from 'lucide-react'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'

const categories = ['All', 'Beach', 'City', 'Cultural', 'Adventure', 'Nature', 'Luxury']

const destinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🏯', category: 'Cultural', desc: 'Neon lights meet ancient temples', budgetFrom: 1200, color: 'from-pink-400 to-red-500' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌺', category: 'Beach', desc: 'Spiritual island paradise', budgetFrom: 800, color: 'from-green-400 to-teal-500' },
  { name: 'Paris', country: 'France', emoji: '🗼', category: 'City', desc: 'The city of love and lights', budgetFrom: 1500, color: 'from-blue-400 to-purple-500' },
  { name: 'Machu Picchu', country: 'Peru', emoji: '🏔️', category: 'Adventure', desc: 'Ancient Inca wonder', budgetFrom: 1000, color: 'from-yellow-500 to-orange-500' },
  { name: 'Santorini', country: 'Greece', emoji: '🏛️', category: 'Luxury', desc: 'Iconic white & blue villages', budgetFrom: 2000, color: 'from-blue-300 to-indigo-500' },
  { name: 'Safari, Serengeti', country: 'Tanzania', emoji: '🦁', category: 'Nature', desc: 'Big Five wildlife experience', budgetFrom: 2500, color: 'from-yellow-600 to-amber-700' },
  { name: 'New York', country: 'USA', emoji: '🗽', category: 'City', desc: 'The city that never sleeps', budgetFrom: 1800, color: 'from-gray-500 to-gray-800' },
  { name: 'Maldives', country: 'Maldives', emoji: '🌊', category: 'Beach', desc: 'Overwater bungalow luxury', budgetFrom: 3000, color: 'from-cyan-400 to-blue-500' },
  { name: 'Kyoto', country: 'Japan', emoji: '⛩️', category: 'Cultural', desc: 'Japan\'s cultural heartbeat', budgetFrom: 1100, color: 'from-red-400 to-orange-400' },
  { name: 'Iceland', country: 'Iceland', emoji: '🌋', category: 'Adventure', desc: 'Northern lights & geysers', budgetFrom: 2200, color: 'from-indigo-400 to-cyan-500' },
  { name: 'Amalfi Coast', country: 'Italy', emoji: '🍋', category: 'Luxury', desc: 'Cliffside villages & azure sea', budgetFrom: 2800, color: 'from-yellow-400 to-orange-400' },
  { name: 'Amazon Rainforest', country: 'Brazil', emoji: '🌿', category: 'Nature', desc: 'World\'s largest rainforest', budgetFrom: 1400, color: 'from-green-500 to-emerald-700' },
]

const trending = [
  { name: 'Japan Sakura Season', tag: '🌸 Trending', heat: 98 },
  { name: 'Bali Digital Nomad', tag: '💻 Hot', heat: 94 },
  { name: 'Iceland Northern Lights', tag: '✨ Seasonal', heat: 89 },
  { name: 'European Summer Rail', tag: '🚂 Popular', heat: 85 },
]

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || d.category === activeCategory
    return matchSearch && matchCat
  })

  const handlePlan = (dest) => {
    navigate('/trip/create', { state: { destination: `${dest.name}, ${dest.country}` } })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <Header title="Explore" />

      <div className="max-w-lg mx-auto px-6 py-4 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search destinations..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean transition-all text-sm" />
        </div>

        {/* Trending */}
        {!search && (
          <div>
            <h2 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-sunset" /> Trending Now
            </h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {trending.map(({ name, tag, heat }) => (
                <button key={name} onClick={() => navigate('/trip/create')}
                  className="flex-shrink-0 bg-white rounded-2xl px-4 py-3 shadow-sm text-left hover:shadow-md transition-shadow">
                  <span className="text-xs font-body text-sunset bg-sunset/10 px-2 py-0.5 rounded-full">{tag}</span>
                  <p className="font-display font-semibold text-gray-800 text-sm mt-1.5 whitespace-nowrap">{name}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex-1 h-1 bg-gray-100 rounded-full">
                      <div className="h-full bg-sunset rounded-full" style={{ width: `${heat}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 font-body">{heat}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-display font-medium text-sm transition-all ${activeCategory === cat ? 'bg-ocean text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-gray-800 flex items-center gap-2">
              <Compass size={16} className="text-ocean" /> {activeCategory === 'All' ? 'All Destinations' : activeCategory}
            </h2>
            <span className="text-gray-400 text-xs font-body">{filtered.length} places</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500 font-body">No destinations found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map(dest => (
                <div key={dest.name} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
                  <div className={`h-28 bg-gradient-to-br ${dest.color} flex items-center justify-center text-5xl relative`}>
                    {dest.emoji}
                    <span className="absolute top-2 right-2 text-xs bg-white/20 backdrop-blur text-white font-body px-2 py-0.5 rounded-full">
                      {dest.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="font-display font-bold text-gray-900 text-sm">{dest.name}</p>
                    <p className="text-gray-400 text-xs font-body">{dest.country}</p>
                    <p className="text-gray-600 text-xs font-body mt-1 leading-snug">{dest.desc}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sunset font-display font-semibold text-xs">From ${dest.budgetFrom}</p>
                      <button onClick={() => handlePlan(dest)}
                        className="bg-ocean text-white font-display font-semibold text-xs px-3 py-1.5 rounded-xl hover:bg-ocean-dark transition-colors">
                        Plan →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
