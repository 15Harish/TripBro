import { useNavigate } from 'react-router-dom'
import { Plane, MapPin, Sparkles, Shield, Clock, ChevronRight, Star } from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'AI-Powered Planning', desc: 'Get personalized itineraries in seconds' },
  { icon: MapPin, title: 'Local Insights', desc: 'Curated recommendations from real data' },
  { icon: Shield, title: 'Budget Transparent', desc: 'Detailed expense breakdowns upfront' },
  { icon: Clock, title: 'Save Hours', desc: 'Skip the research, start the adventure' },
]

const testimonials = [
  { name: 'Sarah K.', rating: 5, text: 'TripBro planned our entire Tokyo trip perfectly. Saved us 10+ hours of research!', avatar: '👩‍🦰' },
  { name: 'Marcus T.', rating: 5, text: 'The budget breakdown was spot on. Not a single surprise expense.', avatar: '👨🏾' },
  { name: 'Priya S.', rating: 5, text: 'Solo travel has never felt safer. The emergency contacts feature is a lifesaver.', avatar: '👩🏽' },
]

const destinations = ['🗼 Paris', '🗽 New York', '🏯 Tokyo', '🦁 Safari', '🏖️ Bali', '🏔️ Nepal']

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <div className="relative min-h-[90vh] flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean via-[#0099d4] to-[#005a8e]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #FF6B35 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F5E6D3 0%, transparent 50%)' }}
        />

        {/* Nav */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Plane size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-display font-bold text-xl">TripBro</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/auth/login')}
              className="text-white/90 text-sm font-display font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
              Login
            </button>
            <button onClick={() => navigate('/auth/register')}
              className="bg-white text-ocean text-sm font-display font-semibold px-4 py-2 rounded-xl hover:bg-sand transition-colors">
              Sign Up
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-12">
          <div className="max-w-lg mx-auto w-full">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-white/90 text-xs font-body font-medium">AI-Powered Travel Planning</span>
            </div>

            <h1 className="font-display font-black text-white text-5xl leading-tight mb-4">
              Your perfect trip,<br />
              <span className="text-sand">planned instantly.</span>
            </h1>

            <p className="text-white/80 font-body text-base leading-relaxed mb-8">
              Tell us where you want to go, your budget, and preferences. TripBro does the rest — accommodation, dining, activities, and more.
            </p>

            {/* Destination chips */}
            <div className="flex gap-2 flex-wrap mb-8">
              {destinations.map(d => (
                <button key={d} onClick={() => navigate('/auth/register')}
                  className="bg-white/15 backdrop-blur text-white text-sm font-body px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/25 transition-colors">
                  {d}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/auth/register')}
              className="w-full bg-sunset text-white font-display font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5501a] active:scale-98 transition-all shadow-lg shadow-sunset/30"
            >
              Start Planning for Free
              <ChevronRight size={20} />
            </button>

            <p className="text-white/50 text-xs text-center mt-3 font-body">No credit card required · Free forever plan</p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full fill-white">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-16 max-w-lg mx-auto">
        <h2 className="font-display font-bold text-3xl text-gray-900 text-center mb-2">Why TripBro?</h2>
        <p className="text-gray-500 text-center font-body mb-10">Everything you need for the perfect trip</p>

        <div className="grid grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center mb-3">
                <Icon size={20} className="text-ocean" />
              </div>
              <h3 className="font-display font-semibold text-gray-800 text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-sand/50 px-6 py-16">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-8">Loved by travelers</h2>
          <div className="space-y-4">
            {testimonials.map(({ name, rating, text, avatar }) => (
              <div key={name} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{avatar}</span>
                  <div>
                    <p className="font-display font-semibold text-gray-800 text-sm">{name}</p>
                    <div className="flex gap-0.5">
                      {Array(rating).fill(0).map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-body leading-relaxed">"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="px-6 py-16 text-center bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">Ready to explore?</h2>
          <p className="text-gray-500 font-body mb-8">Join thousands of travelers who plan smarter with TripBro.</p>
          <button
            onClick={() => navigate('/auth/register')}
            className="bg-ocean text-white font-display font-bold px-10 py-4 rounded-2xl hover:bg-ocean-dark transition-colors shadow-lg shadow-ocean/20"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  )
}
