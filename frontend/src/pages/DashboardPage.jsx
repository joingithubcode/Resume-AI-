import { useEffect, useState } from 'react'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import api from '../api/client'
import Sidebar from '../components/layout/Sidebar'
import AnalyticsCard from '../components/ui/AnalyticsCard'

export default function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/dashboard/analytics').then((res) => setData(res.data)).catch(() => setData(null))
  }, [])

  const chart = (data?.ats_history || []).map((v, idx) => ({ name: `R${idx + 1}`, score: v }))

  return (
    <div className='flex rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'>
      <Sidebar />
      <section className='w-full p-6'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <p className='mb-6 text-sm text-slate-500'>Track ATS performance, resumes, and AI insights.</p>

        <div className='grid gap-4 md:grid-cols-4'>
          <AnalyticsCard title='Resumes' value={data?.total_resumes ?? '-'} />
          <AnalyticsCard title='Avg ATS Score' value={data?.avg_ats_score ?? '-'} note='+12% this month' />
          <AnalyticsCard title='Downloads' value={data?.downloads ?? '-'} />
          <AnalyticsCard title='Improvement' value={`${data?.improvement_rate ?? '-'}%`} />
        </div>

        <div className='mt-6 grid gap-4 lg:grid-cols-3'>
          <div className='rounded-2xl border border-slate-200 p-4 lg:col-span-2 dark:border-slate-800'>
            <h3 className='mb-3 font-medium'>ATS Score Trend</h3>
            <div className='h-52'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chart}>
                  <XAxis dataKey='name' />
                  <Tooltip />
                  <Line type='monotone' dataKey='score' stroke='#6366f1' strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='rounded-2xl border border-slate-200 p-4 dark:border-slate-800'>
            <h3 className='mb-3 font-medium'>Activity Timeline</h3>
            <ul className='space-y-2 text-sm text-slate-500'>
              {(data?.activity || ['No recent activity']).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
