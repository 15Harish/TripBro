import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, Download, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useApp } from '../context/AppContext'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'

const COLORS = ['#0077BE', '#FF6B35', '#10b981', '#f59e0b', '#8b5cf6']

export default function Budget() {
  const { tripId } = useParams()
  const { trips, currency } = useApp()
  const trip = trips.find(t => t.id === tripId)

  if (!trip) return null

  const budget = trip.budget || {}
  const categories = [
    { name: 'Accommodation', value: budget.accommodation || 0, emoji: '🏨' },
    { name: 'Food', value: budget.food || 0, emoji: '🍜' },
    { name: 'Activities', value: budget.activities || 0, emoji: '🎭' },
    { name: 'Transport', value: budget.transport || 0, emoji: '🚌' },
    { name: 'Misc', value: budget.misc || 0, emoji: '💡' },
  ]

  const days = trip.days?.length || 1
  const perDay = Math.round((budget.total || 0) / days)

  const dayData = trip.days?.map(d => ({
    name: `Day ${d.day}`,
    cost: d.totalDayCost || 0
  })) || []

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <Header title="Budget Breakdown" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* Hero */}
        <div className="bg-gradient-to-br from-ocean to-[#005a8e] rounded-3xl p-6 text-white">
          <p className="text-white/70 font-body text-sm mb-1">{trip.destination}</p>
          <p className="font-display font-bold text-lg mb-1">Total Budget</p>
          <p className="font-display font-black text-5xl">${budget.total?.toLocaleString()}</p>
          <p className="text-white/70 font-body text-sm mt-2">≈ ${perDay}/day · {days} days</p>
        </div>

        {/* Pie */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="font-display font-bold text-gray-800 mb-4">Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categories} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {categories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={v => `$${v}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categories.map(({ name, value, emoji }, i) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-gray-600 font-body flex-1 truncate">{emoji} {name}</span>
                <span className="text-xs font-display font-bold text-gray-800">${value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per-category breakdown */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="font-display font-bold text-gray-800 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categories.map(({ name, value, emoji }, i) => {
              const pct = budget.total ? Math.round((value / budget.total) * 100) : 0
              return (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-sm text-gray-700">{emoji} {name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs font-body">{pct}%</span>
                      <span className="font-display font-bold text-gray-900">${value}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: COLORS[i] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Daily costs */}
        {dayData.length > 0 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h3 className="font-display font-bold text-gray-800 mb-4">Daily Spending</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={dayData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans' }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => `$${v}`} />
                <Bar dataKey="cost" fill="#0077BE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tips */}
        <div className="bg-ocean/5 border border-ocean/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-ocean" />
            <p className="font-display font-semibold text-ocean text-sm">Budget Tips</p>
          </div>
          <ul className="space-y-1.5 text-gray-600 font-body text-xs leading-relaxed">
            <li>• Book accommodation at least 2 weeks in advance for best rates</li>
            <li>• Use public transport instead of taxis to save on transport costs</li>
            <li>• Eat lunch at local spots — often cheaper and more authentic</li>
            <li>• Many museums offer free entry on specific days of the week</li>
          </ul>
        </div>

        <button className="w-full bg-white border border-gray-200 text-gray-700 font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={16} /> Export Budget Report
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
