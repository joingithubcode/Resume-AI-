import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../api/client'

export default function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate()
  const isSignup = mode === 'signup'
  const [form, setForm] = useState({ full_name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignup) {
        await api.post('/auth/signup', form)
      }
      const loginRes = await api.post('/auth/login', { email: form.email, password: form.password })
      localStorage.setItem('token', loginRes.data.access_token)
      navigate('/dashboard')
    } catch {
      setError('Authentication failed. Please check credentials.')
    }
  }

  return (
    <div className='mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900'>
      <h1 className='text-2xl font-semibold'>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
      <p className='mb-5 mt-2 text-sm text-slate-500'>Secure JWT authentication with optional Google login.</p>
      <form onSubmit={submit} className='space-y-3'>
        {isSignup ? (
          <input
            placeholder='Full name'
            className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        ) : null}
        <input
          placeholder='Email'
          type='email'
          className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder='Password'
          type='password'
          className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error ? <p className='text-sm text-red-500'>{error}</p> : null}
        <button type='submit' className='w-full rounded-lg bg-indigo-600 px-4 py-2 text-white'>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button type='button' className='mt-3 w-full rounded-lg border px-4 py-2'>Continue with Google</button>
      <button type='button' className='mt-2 text-xs text-slate-500'>Forgot password?</button>
    </div>
  )
}
