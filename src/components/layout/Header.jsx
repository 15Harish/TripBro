import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical } from 'lucide-react'

export default function Header({ title, showBack = false, rightAction, transparent = false }) {
  const navigate = useNavigate()

  return (
    <header className={`sticky top-0 z-40 safe-top ${transparent ? 'bg-transparent' : 'glass border-b border-gray-100'}`}>
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean to-sunset flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">TB</span>
            </div>
            <span className="font-display font-bold text-ocean text-lg">TripBro</span>
          </div>
        )}

        {title && (
          <h1 className="font-display font-semibold text-gray-800 text-base absolute left-1/2 -translate-x-1/2">{title}</h1>
        )}

        <div className="w-10 flex justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  )
}
