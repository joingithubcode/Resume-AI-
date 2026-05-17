import { Link } from 'react-router-dom'

import ThemeToggle from '../ui/ThemeToggle'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
        <Link to='/' className='text-xl font-semibold tracking-tight'>ResumeAI Pro</Link>
        <nav className='hidden gap-5 md:flex'>
          <Link to='/pricing'>Pricing</Link>
          <Link to='/faq'>FAQ</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Link to='/login' className='rounded-xl bg-slate-900 px-4 py-2 text-white dark:bg-indigo-500'>Login</Link>
        </div>
      </div>
    </header>
  )
}
