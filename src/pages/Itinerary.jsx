import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  MapPin, Calendar, DollarSign, Users, Cloud, ChevronDown, ChevronUp,
  Share2, Bookmark, Edit3, Clock, Star, AlertCircle, Coffee, Sun, Moon,
  Utensils, Car, Lightbulb, Phone
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#0077BE', '#FF6B35', '#10b981', '#f59e0b', '#8b5cf6']

export default function Itinerary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { trips } = useApp()
  const [openDay, setOpenDay] = useState(0)
  const [activeTab, setActiveTab] = useState('itinerary')
  const [shared, setShared] = useState(false)

  const trip = trips.find(t => t.id === id)

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="font-display font-bold text-xl text-gray-800 mb-2">Trip not found</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-4 bg-ocean text-white font-display font-semibold px-6 py-3 rounded-2xl">
          Go to Dashboard
        </button>
      </div>
    )
  }

  const budgetData = trip.budget ? [
    { name: 'Accommodation', value: trip.budget.accommodation },
    { name: 'Food', value: trip.budget.food },
    { name: 'Activities', value: trip.budget.activities },
    { name: 'Transport', value: trip.budget.transport },
    { name: 'Misc', value: trip.budget.misc },
  ] : []

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `My trip to ${trip.destination}`, text: trip.summary, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const tabs = ['itinerary', 'budget', 'tips']

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-ocean via-[#0077BE] to-[#005a8e] text-white">
        <Header showBack transparent
          rightAction={
            <div className="flex gap-2">
              <button onClick={handleShare} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Share2 size={18} />
              </button>
              <button onClick={() => navigate(`/trip/customize/${trip.id}`)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Edit3 size={18} />
              </button>
            </div>
          }
        />

        {shared && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white text-ocean font-display font-semibold text-sm px-4 py-2 rounded-xl shadow-lg z-50">
            Link copied! ✓
          </div>
        )}

        <div className="px-6 pt-2 pb-8">
          <div className="max-w-lg mx-auto">
            <div className="text-4xl mb-3">🌍</div>
            <h1 className="font-display font-black text-3xl mb-2">{trip.destination}</h1>
            <p className="text-white/80 font-body text-sm leading-relaxed mb-5">{trip.summary}</p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Calendar, text: `${trip.startDate} → ${trip.endDate}` },
                { icon: DollarSign, text: `$${trip.budget?.total?.toLocaleString() || trip.budget}` },
                { icon: Users, text: `${trip.groupSize} traveler${trip.groupSize > 1 ? 's' : ''}` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 text-xs font-body">
                  <Icon size={12} /> {text}
                </div>
              ))}
            </div>

            {/* Weather */}
            {trip.weather && (
              <div className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                <Cloud size={18} className="text-white/80" />
                <div>
                  <p className="text-white font-display font-semibold text-sm">{trip.weather.temp} · {trip.weather.condition}</p>
                  <p className="text-white/70 text-xs font-body">{trip.weather.tip}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 30" className="w-full fill-gray-50 -mb-1">
          <path d="M0,15 C360,30 1080,0 1440,15 L1440,30 L0,30 Z" />
        </svg>
      </div>

      {/* Highlights */}
      {trip.highlights && (
        <div className="px-6 pt-4 pb-2 max-w-lg mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {trip.highlights.map((h, i) => (
              <div key={i} className="flex-shrink-0 bg-white rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-gray-700 font-body text-xs whitespace-nowrap">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-gray-50 px-6 pt-2">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-1 flex shadow-sm">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2.5 rounded-xl font-display font-semibold text-sm capitalize transition-all ${activeTab === t ? 'bg-ocean text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t === 'itinerary' ? '📅 Days' : t === 'budget' ? '💰 Budget' : '💡 Tips'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-4">
        {/* ITINERARY TAB */}
        {activeTab === 'itinerary' && (
          <div className="space-y-3">
            {trip.days?.map((day, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenDay(openDay === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-ocean text-white flex items-center justify-center font-display font-bold text-sm">
                      {day.day}
                    </div>
                    <div className="text-left">
                      <p className="font-display font-bold text-gray-900 text-sm">{day.title}</p>
                      <p className="text-gray-400 text-xs font-body">{day.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sunset font-display font-semibold text-sm">${day.totalDayCost}</span>
                    {openDay === idx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>

                {openDay === idx && (
                  <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                    {/* Morning */}
                    {day.morning && <ActivityBlock icon={<Sun size={14} className="text-yellow-500" />} label="Morning" data={day.morning} />}
                    {/* Lunch */}
                    {day.lunch && (
                      <div className="bg-sand/50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils size={14} className="text-sunset" />
                          <span className="font-display font-semibold text-gray-700 text-sm">Lunch</span>
                        </div>
                        <p className="font-display font-bold text-gray-900">{day.lunch.restaurant}</p>
                        <p className="text-gray-500 text-xs font-body">{day.lunch.cuisine} · {day.lunch.address}</p>
                        <p className="text-sunset font-display font-medium text-sm mt-1">${day.lunch.cost}/person</p>
                        {day.lunch.tip && <p className="text-gray-500 text-xs font-body mt-1 flex items-center gap-1"><Lightbulb size={11} />{day.lunch.tip}</p>}
                      </div>
                    )}
                    {/* Afternoon */}
                    {day.afternoon && <ActivityBlock icon={<Coffee size={14} className="text-orange-400" />} label="Afternoon" data={day.afternoon} />}
                    {/* Evening */}
                    {day.evening && <ActivityBlock icon={<Moon size={14} className="text-indigo-400" />} label="Evening" data={day.evening} />}
                    {/* Transport */}
                    {day.transport && (
                      <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-3">
                        <Car size={14} className="text-ocean mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-display font-semibold text-gray-800 text-sm">{day.transport.mode}</p>
                          <p className="text-gray-500 text-xs font-body">{day.transport.tip} · ${day.transport.cost}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* BUDGET TAB */}
        {activeTab === 'budget' && trip.budget && (
          <div className="space-y-4 fade-up">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="text-center mb-4">
                <p className="text-gray-400 font-body text-sm">Total Budget</p>
                <p className="font-display font-black text-4xl text-ocean">${trip.budget.total?.toLocaleString()}</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={budgetData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {budgetData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `$${v}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3">
              {budgetData.map(({ name, value }, i) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="flex-1 text-gray-700 font-body text-sm">{name}</span>
                  <span className="font-display font-bold text-gray-900">${value}</span>
                  <span className="text-gray-400 text-xs font-body w-10 text-right">
                    {Math.round((value / trip.budget.total) * 100)}%
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-display font-bold text-gray-800">Total</span>
                <span className="font-display font-bold text-ocean text-lg">${trip.budget.total?.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => navigate(`/budget/${trip.id}`)}
              className="w-full bg-white border border-gray-200 text-ocean font-display font-semibold py-3.5 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
              View Detailed Breakdown →
            </button>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="space-y-4 fade-up">
            {trip.tips?.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-display font-bold text-sm flex-shrink-0">{i + 1}</div>
                <p className="text-gray-700 font-body text-sm leading-relaxed">{tip}</p>
              </div>
            ))}

            {/* Emergency Contacts */}
            {trip.emergencyContacts && (
              <div className="bg-red-50 border border-red-100 rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={18} className="text-red-500" />
                  <h3 className="font-display font-bold text-red-700">Emergency Contacts</h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(trip.emergencyContacts).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <Phone size={14} className="text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs font-body capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="font-display font-semibold text-gray-800 text-sm">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accommodation */}
            {trip.accommodation && (
              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-gray-800 mb-4">🏨 Accommodation</h3>
                <p className="font-display font-bold text-gray-900 text-lg">{trip.accommodation.name}</p>
                <p className="text-gray-500 font-body text-sm capitalize">{trip.accommodation.type} · ⭐ {trip.accommodation.rating}</p>
                <p className="text-ocean font-display font-semibold mt-1">${trip.accommodation.pricePerNight}/night</p>
                <p className="text-gray-500 font-body text-xs mt-1">{trip.accommodation.address}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {trip.accommodation.amenities?.map(a => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-body">{a}</span>
                  ))}
                </div>
                <a href={trip.accommodation.bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 w-full bg-ocean text-white font-display font-semibold py-3 rounded-2xl flex items-center justify-center hover:bg-ocean-dark transition-colors text-sm">
                  Book on Booking.com →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

function ActivityBlock({ icon, label, data }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-display font-semibold text-gray-500 text-xs uppercase tracking-wide">{label}</span>
        <span className="text-gray-400 text-xs font-body ml-auto">{data.time}</span>
      </div>
      <p className="font-display font-bold text-gray-900 text-sm">{data.activity}</p>
      <p className="text-gray-500 text-xs font-body mt-1 leading-relaxed">{data.description}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-sunset font-display font-semibold text-sm">${data.cost}</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400 text-xs font-body flex items-center gap-1"><Clock size={10} />{data.duration}</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400 text-xs font-body flex items-center gap-1"><MapPin size={10} />{data.location}</span>
      </div>
      {data.tips && (
        <div className="mt-2 flex items-start gap-1.5">
          <Lightbulb size={12} className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <p className="text-gray-500 text-xs font-body italic">{data.tips}</p>
        </div>
      )}
    </div>
  )
}
