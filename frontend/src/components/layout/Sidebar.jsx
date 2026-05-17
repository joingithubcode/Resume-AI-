import { BarChart3, FileText, Home, Lightbulb, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Overview', icon: Home },
  { to: '/builder', label: 'Resume Builder', icon: FileText },
  { to: '/dashboard', label: 'ATS History', icon: BarChart3 },
  { to: '/dashboard', label: 'AI Suggestions', icon: Lightbulb },
  { to: '/dashboard', label: 'Profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className='hidden w-64 border-r border-slate-200 p-4 lg:block dark:border-slate-800'>
      <div className='space-y-2'>
        {items.map(({ to, label, icon: Icon }) => (
          <Link key={label} to={to} className='flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900'>
            <Icon size={16} /> {label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
