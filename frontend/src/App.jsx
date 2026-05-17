import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import AppShell from './components/layout/AppShell'
import AuthPage from './pages/AuthPage'
import BuilderPage from './pages/BuilderPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import StaticPage from './pages/StaticPage'
import { hydrateTheme } from './store/themeSlice'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hydrateTheme())
  }, [dispatch])

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<AuthPage mode='login' />} />
        <Route path='/signup' element={<AuthPage mode='signup' />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/builder' element={<BuilderPage />} />
        <Route path='/about' element={<StaticPage title='About' description='ResumeAI Pro helps job seekers build ATS-optimized resumes with AI-driven insights.' />} />
        <Route path='/contact' element={<StaticPage title='Contact' description='Reach our team for product demos, enterprise plans, and partnership inquiries.' />} />
        <Route path='/pricing' element={<StaticPage title='Pricing' description='Starter, Pro, and Team plans with AI credits, ATS scans, and premium templates.' />} />
        <Route path='/faq' element={<StaticPage title='FAQ' description='Find answers about templates, exports, ATS scoring, authentication, and billing.' />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
