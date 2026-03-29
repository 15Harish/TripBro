import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Globe, Bell, Shield, DollarSign, HelpCircle, Info, LogOut, ChevronRight, Camera, Edit2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'SGD']

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout, trips, currency, setCurrency } = useApp()
  const [showCurrency, setShowCurrency] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const countries = new Set(trips.map(t => t.destination?.split(',').pop()?.trim()).filter(Boolean)).size

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Info', action: () => {} },
        { icon: Mail, label: 'Email Preferences', action: () => {} },
        { icon: Shield, label: 'Privacy & Security', action: () => {} },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: DollarSign, label: 'Currency', value: currency, action: () => setShowCurrency(true) },
        { icon: Bell, label: 'Notifications', toggle: true, value: notifications, action: () => setNotifications(!notifications) },
        { icon: Globe, label: 'Language', value: 'English', action: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & FAQ', action: () => {} },
        { icon: Info, label: 'About TripBro', action: () => {} },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <Header title="Profile" />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-ocean to-sunset flex items-center justify-center text-4xl shadow-lg shadow-ocean/20">
              {user?.avatar || '✈️'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Camera size={14} className="text-gray-600" />
            </button>
          </div>
          <h2 className="font-display font-black text-xl text-gray-900">{user?.name || 'Traveler'}</h2>
          <p className="text-gray-400 font-body text-sm">{user?.email}</p>
          <button className="mt-2 flex items-center gap-1.5 text-ocean text-sm font-display font-medium hover:underline">
            <Edit2 size={13} /> Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Trips', value: trips.length, emoji: '✈️' },
            { label: 'Countries', value: countries, emoji: '🌍' },
            { label: 'Days Planned', value: trips.reduce((acc, t) => {
              if (t.startDate && t.endDate) acc += Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / 86400000)
              return acc
            }, 0), emoji: '📅' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <p className="text-2xl mb-1">{emoji}</p>
              <p className="font-display font-black text-2xl text-gray-900">{value}</p>
              <p className="text-gray-400 text-xs font-body">{label}</p>
            </div>
          ))}
        </div>

        {/* Settings sections */}
        {sections.map(({ title, items }) => (
          <div key={title}>
            <p className="text-xs text-gray-400 font-display font-semibold uppercase tracking-wider mb-2 px-1">{title}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {items.map(({ icon: Icon, label, value, action, toggle }, i) => (
                <button key={label} onClick={action}
                  className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left ${i < items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-gray-600" />
                  </div>
                  <span className="flex-1 font-body text-gray-700 text-sm">{label}</span>
                  {toggle ? (
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${value ? 'bg-ocean' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-5' : 'left-1'}`} />
                    </div>
                  ) : value ? (
                    <span className="text-gray-400 text-sm font-body">{value}</span>
                  ) : null}
                  {!toggle && <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full bg-white border border-red-100 text-red-500 font-display font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm">
          <LogOut size={18} />
          Sign Out
        </button>

        <p className="text-center text-gray-300 text-xs font-body pb-2">TripBro v1.0.0 · Made with ❤️</p>
      </div>

      {/* Currency Sheet */}
      {showCurrency && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100">
              <h3 className="font-display font-bold text-gray-900">Select Currency</h3>
            </div>
            {currencies.map(c => (
              <button key={c} onClick={() => { setCurrency(c); setShowCurrency(false) }}
                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-b border-gray-50 transition-colors ${currency === c ? 'text-ocean' : 'text-gray-700'}`}>
                <span className="font-body text-sm">{c}</span>
                {currency === c && <span className="text-ocean font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
