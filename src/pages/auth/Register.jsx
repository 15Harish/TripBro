import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Plane } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function PasswordStrength({ password }) {
  const strength = !password ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400']
  return password ? (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? colors[strength] : 'bg-gray-200'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-500 font-body">{labels[strength]}</p>
    </div>
  ) : null
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setError('Please fill all fields'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (!agreed) { setError('Please accept the terms'); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 1200))
    login({ id: Date.now().toString(), name: form.name, email: form.email, avatar: '✈️' })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunset/5 to-white flex flex-col">
      <div className="px-6 pt-12 pb-6">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-ocean flex items-center justify-center">
            <Plane size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-ocean font-display font-bold text-xl">TripBro</span>
        </Link>
        <h1 className="font-display font-black text-3xl text-gray-900 mb-1">Create account</h1>
        <p className="text-gray-500 font-body">Start your journey with TripBro</p>
      </div>

      <div className="flex-1 px-6 max-w-lg mx-auto w-full pb-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-body rounded-xl px-4 py-3 mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { field: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe' },
            { field: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'you@example.com' },
          ].map(({ field, label, icon: Icon, type, placeholder }) => (
            <div key={field}>
              <label className="font-display font-medium text-gray-700 text-sm block mb-2">{label}</label>
              <div className="relative">
                <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={type} placeholder={placeholder} value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all" />
              </div>
            </div>
          ))}

          <div>
            <label className="font-display font-medium text-gray-700 text-sm block mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Create a strong password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrength password={form.password} />
          </div>

          <div>
            <label className="font-display font-medium text-gray-700 text-sm block mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder="Repeat your password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all" />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 rounded" />
            <span className="text-gray-600 text-sm font-body leading-relaxed">
              I agree to the <span className="text-ocean font-medium">Terms of Service</span> and <span className="text-ocean font-medium">Privacy Policy</span>
            </span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full bg-sunset text-white font-display font-bold py-4 rounded-2xl hover:bg-[#e5501a] disabled:opacity-70 transition-all shadow-lg shadow-sunset/20 mt-2">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-500 font-body text-sm mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-ocean font-display font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
