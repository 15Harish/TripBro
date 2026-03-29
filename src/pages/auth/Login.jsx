import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Plane } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    // Simulate auth
    await new Promise(r => setTimeout(r, 1000))
    login({ id: '1', name: form.email.split('@')[0], email: form.email, avatar: '✈️' })
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean/5 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-ocean flex items-center justify-center">
            <Plane size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-ocean font-display font-bold text-xl">TripBro</span>
        </Link>

        <h1 className="font-display font-black text-3xl text-gray-900 mb-1">Welcome back!</h1>
        <p className="text-gray-500 font-body">Sign in to continue your adventures</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 max-w-lg mx-auto w-full">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-body rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-display font-medium text-gray-700 text-sm block mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-display font-medium text-gray-700 text-sm block mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600 text-sm font-body">Remember me</span>
            </label>
            <Link to="/auth/forgot-password" className="text-ocean text-sm font-display font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ocean text-white font-display font-bold py-4 rounded-2xl hover:bg-ocean-dark disabled:opacity-70 transition-all shadow-lg shadow-ocean/20 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm font-body">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          {['🔵 Google', '🔷 Facebook'].map(provider => (
            <button key={provider}
              onClick={() => { login({ id: '1', name: 'Demo User', email: 'demo@tripbro.com', avatar: '✈️' }); navigate('/dashboard') }}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white font-display font-medium text-gray-700 text-sm hover:bg-gray-50 transition-colors">
              {provider}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-500 font-body text-sm mt-8">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-ocean font-display font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
