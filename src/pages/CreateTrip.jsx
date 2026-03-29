import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, DollarSign, Users, Heart, ChevronRight, ChevronLeft, Sparkles, Loader } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { generateItinerary } from '../services/aiService'
import Header from '../components/layout/Header'

const STEPS = ['Destination', 'Dates & Budget', 'Preferences', 'Generate']

const travelStyles = [
  { id: 'budget', label: '🎒 Budget', desc: 'Hostels & street food' },
  { id: 'comfort', label: '🏨 Comfort', desc: 'Mid-range hotels' },
  { id: 'luxury', label: '💎 Luxury', desc: '5-star experiences' },
  { id: 'adventure', label: '🧗 Adventure', desc: 'Outdoor & thrills' },
  { id: 'cultural', label: '🎭 Cultural', desc: 'History & arts' },
  { id: 'family', label: '👨‍👩‍👧 Family', desc: 'Kid-friendly' },
]

const dietOptions = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-free']

const interestOptions = [
  '🏛️ Museums', '🍜 Food Tours', '🌿 Nature', '🏖️ Beaches',
  '🛍️ Shopping', '🎵 Nightlife', '📸 Photography', '🏃 Sports',
  '🎨 Art', '🕌 Religious Sites', '🎡 Theme Parks', '🍷 Wine & Dine',
]

const tips = [
  'Checking best flight deals ✈️',
  'Curating local hidden gems 💎',
  'Optimizing your daily schedule 📅',
  'Finding best-value accommodation 🏨',
  'Building your expense breakdown 💰',
  'Adding local dining recommendations 🍜',
  'Finalizing your perfect itinerary ✨',
]

export default function CreateTrip() {
  const navigate = useNavigate()
  const { saveTrip, setLoading } = useApp()
  const [step, setStep] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1500,
    groupSize: 2,
    travelStyle: 'comfort',
    dietary: 'None',
    interests: [],
    notes: '',
  })

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }))

  const toggleInterest = (i) => {
    const arr = form.interests.includes(i) ? form.interests.filter(x => x !== i) : [...form.interests, i]
    update('interests', arr)
  }

  const days = form.startDate && form.endDate
    ? Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000)
    : 0

  const canNext = [
    form.destination.length > 2,
    form.startDate && form.endDate && days > 0,
    form.travelStyle,
    true,
  ][step]

  const handleGenerate = async () => {
    setGenerating(true)
    const interval = setInterval(() => setTipIndex(i => (i + 1) % tips.length), 1800)
    try {
      const trip = await generateItinerary({ ...form, interests: form.interests.join(', ') })
      const saved = saveTrip(trip)
      clearInterval(interval)
      navigate(`/trip/itinerary/${saved.id}`)
    } catch (err) {
      console.error(err)
      clearInterval(interval)
      setGenerating(false)
    }
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean via-[#0099d4] to-[#005a8e] flex flex-col items-center justify-center px-6 text-white">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 border-t-white animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">✈️</div>
        </div>
        <h2 className="font-display font-black text-3xl mb-3 text-center">Building your trip</h2>
        <p className="text-white/70 text-center font-body mb-8">Our AI is crafting a personalized itinerary for {form.destination}</p>
        <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 max-w-sm w-full text-center">
          <p className="text-white font-body text-sm animate-pulse">{tips[tipIndex]}</p>
        </div>
        <div className="flex gap-2 mt-8">
          {tips.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === tipIndex ? 'bg-white scale-125' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Plan a Trip" showBack />

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all ${
                  i < step ? 'bg-ocean text-white' : i === step ? 'bg-ocean text-white ring-4 ring-ocean/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-ocean' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 font-body">Step {step + 1} of {STEPS.length}: <span className="font-medium text-gray-700">{STEPS[step]}</span></p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-6 py-6">

          {/* Step 0: Destination */}
          {step === 0 && (
            <div className="fade-up space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-gray-900 mb-1">Where to? 🌍</h2>
                <p className="text-gray-500 font-body text-sm">Enter a city, country, or region</p>
              </div>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean" />
                <input
                  type="text"
                  placeholder="e.g. Tokyo, Japan"
                  value={form.destination}
                  onChange={e => update('destination', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-white font-display font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ocean transition-all text-lg"
                  autoFocus
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-body mb-3">Popular destinations</p>
                <div className="flex flex-wrap gap-2">
                  {['Paris 🗼', 'Tokyo 🏯', 'Bali 🌺', 'New York 🗽', 'Rome 🏛️', 'Dubai 🌆', 'Bangkok 🐘', 'London 🎡'].map(d => (
                    <button key={d} onClick={() => update('destination', d.split(' ')[0] + ', ' + { 'Paris': 'France', 'Tokyo': 'Japan', 'Bali': 'Indonesia', 'New York': 'USA', 'Rome': 'Italy', 'Dubai': 'UAE', 'Bangkok': 'Thailand', 'London': 'UK' }[d.split(' ')[0]])}
                      className="bg-white border border-gray-200 text-gray-700 text-sm font-body px-3 py-1.5 rounded-full hover:border-ocean hover:text-ocean transition-colors">
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Dates & Budget */}
          {step === 1 && (
            <div className="fade-up space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-gray-900 mb-1">Dates & Budget 📅</h2>
                <p className="text-gray-500 font-body text-sm">When are you going and what's your budget?</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-display font-medium text-gray-700 text-sm block mb-2">Start Date</label>
                  <input type="date" value={form.startDate} min={new Date().toISOString().split('T')[0]}
                    onChange={e => update('startDate', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white font-body text-gray-800 focus:outline-none focus:border-ocean transition-all" />
                </div>
                <div>
                  <label className="font-display font-medium text-gray-700 text-sm block mb-2">End Date</label>
                  <input type="date" value={form.endDate} min={form.startDate || new Date().toISOString().split('T')[0]}
                    onChange={e => update('endDate', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white font-body text-gray-800 focus:outline-none focus:border-ocean transition-all" />
                </div>
              </div>

              {days > 0 && (
                <div className="bg-ocean/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <Calendar size={18} className="text-ocean" />
                  <p className="text-ocean font-display font-semibold text-sm">{days} day{days > 1 ? 's' : ''} trip to {form.destination}</p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-display font-medium text-gray-700 text-sm">Total Budget (USD)</label>
                  <span className="font-display font-bold text-ocean text-lg">${form.budget.toLocaleString()}</span>
                </div>
                <input type="range" min={200} max={20000} step={100} value={form.budget}
                  onChange={e => update('budget', Number(e.target.value))}
                  className="w-full accent-ocean h-2 rounded-full" />
                <div className="flex justify-between text-xs text-gray-400 font-body mt-1">
                  <span>$200</span><span>$20,000</span>
                </div>
                {days > 0 && (
                  <p className="text-gray-500 text-xs font-body mt-2 text-center">
                    ≈ ${Math.round(form.budget / days)}/day per person
                  </p>
                )}
              </div>

              <div>
                <label className="font-display font-medium text-gray-700 text-sm block mb-3">Group Size</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => update('groupSize', Math.max(1, form.groupSize - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-display font-bold text-gray-600 hover:border-ocean hover:text-ocean transition-colors">−</button>
                  <div className="flex-1 text-center">
                    <span className="font-display font-black text-3xl text-gray-900">{form.groupSize}</span>
                    <p className="text-gray-500 text-xs font-body">{form.groupSize === 1 ? 'Solo traveler' : `${form.groupSize} people`}</p>
                  </div>
                  <button onClick={() => update('groupSize', Math.min(20, form.groupSize + 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-display font-bold text-gray-600 hover:border-ocean hover:text-ocean transition-colors">+</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="fade-up space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-gray-900 mb-1">Your Style 🎨</h2>
                <p className="text-gray-500 font-body text-sm">Help us personalize your experience</p>
              </div>

              <div>
                <label className="font-display font-medium text-gray-700 text-sm block mb-3">Travel Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {travelStyles.map(({ id, label, desc }) => (
                    <button key={id} onClick={() => update('travelStyle', id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${form.travelStyle === id ? 'border-ocean bg-ocean/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                      <p className="font-display font-semibold text-gray-800 text-sm">{label}</p>
                      <p className="text-gray-500 text-xs font-body mt-0.5">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-display font-medium text-gray-700 text-sm block mb-3">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map(d => (
                    <button key={d} onClick={() => update('dietary', d)}
                      className={`px-4 py-2 rounded-full border text-sm font-body transition-all ${form.dietary === d ? 'bg-ocean text-white border-ocean' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-display font-medium text-gray-700 text-sm block mb-3">Interests <span className="text-gray-400 font-normal">(pick any)</span></label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button key={interest} onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full border text-sm font-body transition-all ${form.interests.includes(interest) ? 'bg-sunset text-white border-sunset' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-display font-medium text-gray-700 text-sm block mb-2">Special Requests <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={3}
                  placeholder="e.g. wheelchair accessible, avoid crowded places, must see cherry blossoms..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean transition-all resize-none text-sm" />
              </div>
            </div>
          )}

          {/* Step 3: Review & Generate */}
          {step === 3 && (
            <div className="fade-up space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-gray-900 mb-1">Ready! 🚀</h2>
                <p className="text-gray-500 font-body text-sm">Review your trip details</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
                {[
                  { icon: MapPin, label: 'Destination', value: form.destination },
                  { icon: Calendar, label: 'Dates', value: `${form.startDate} → ${form.endDate} (${days} days)` },
                  { icon: DollarSign, label: 'Budget', value: `$${form.budget.toLocaleString()} total` },
                  { icon: Users, label: 'Group', value: `${form.groupSize} traveler${form.groupSize > 1 ? 's' : ''}` },
                  { icon: Heart, label: 'Style', value: travelStyles.find(s => s.id === form.travelStyle)?.label },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-ocean" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-body">{label}</p>
                      <p className="font-display font-semibold text-gray-800 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
                {form.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                    {form.interests.map(i => (
                      <span key={i} className="text-xs bg-sunset/10 text-sunset font-body px-2 py-1 rounded-full">{i}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-ocean/5 to-sunset/5 rounded-2xl p-4">
                <div className="flex gap-3 items-start">
                  <Sparkles size={18} className="text-ocean mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 font-body text-sm leading-relaxed">
                    Our AI will generate a complete day-by-day itinerary with accommodation, dining, activities, and a full budget breakdown — all personalized for your trip.
                  </p>
                </div>
              </div>

              <button onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-ocean to-sunset text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg text-lg">
                <Sparkles size={20} />
                Generate My Itinerary
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nav Buttons */}
      {!generating && (
        <div className="bg-white border-t border-gray-100 px-6 py-4 safe-bottom">
          <div className="max-w-lg mx-auto flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="flex-1 bg-gray-100 text-gray-700 font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <ChevronLeft size={18} /> Back
              </button>
            )}
            {step < 3 && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext}
                className="flex-1 bg-ocean text-white font-display font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-ocean-dark transition-colors">
                Next <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
