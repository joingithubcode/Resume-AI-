import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

export default function AppShell() {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'>
      <Header />
      <main className='mx-auto w-full max-w-7xl px-4 py-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
