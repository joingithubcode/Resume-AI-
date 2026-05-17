import { useMemo, useState } from 'react'

import api from '../api/client'
import ResumeTemplateCard from '../components/ui/ResumeTemplateCard'
import { resumeTemplates } from '../data/templates'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  targetRole: '',
  summary: '',
  skills: '',
  experience: '',
}

const sections = ['summary', 'skills', 'experience']

export default function BuilderPage() {
  const [step, setStep] = useState(1)
  const [template, setTemplate] = useState('minimal-ats')
  const [form, setForm] = useState(initialForm)
  const [ats, setAts] = useState(null)
  const [ai, setAi] = useState(null)
  const [orderedSections, setOrderedSections] = useState(sections)

  const preview = useMemo(() => ({ ...form, template }), [form, template])

  const onDragStart = (event, section) => event.dataTransfer.setData('section', section)
  const onDrop = (event, dropSection) => {
    const dragSection = event.dataTransfer.getData('section')
    if (!dragSection || dragSection === dropSection) return
    const next = [...orderedSections]
    const from = next.indexOf(dragSection)
    const to = next.indexOf(dropSection)
    next.splice(from, 1)
    next.splice(to, 0, dragSection)
    setOrderedSections(next)
  }

  const generateAI = async () => {
    const [suggestRes, atsRes, jobsRes] = await Promise.all([
      api.post('/ai/suggest', form),
      api.post('/ats/score', form),
      api.post('/ai/predict-jobs', form),
    ])
    setAi({ ...suggestRes.data, ...jobsRes.data })
    setAts(atsRes.data)
    if (suggestRes.data.summary) setForm((s) => ({ ...s, summary: suggestRes.data.summary }))
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <h1 className='text-2xl font-semibold'>AI Resume Builder</h1>
        <p className='text-sm text-slate-500'>Multi-step editor with real-time preview, ATS scoring, and AI recommendations.</p>
      </div>

      <div className='grid gap-6 xl:grid-cols-12'>
        <section className='space-y-4 xl:col-span-7'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='font-semibold'>Step {step} / 3</h2>
              <div className='flex gap-2'>
                <button type='button' onClick={() => setStep((s) => Math.max(1, s - 1))} className='rounded-lg border px-3 py-1 text-sm'>Prev</button>
                <button type='button' onClick={() => setStep((s) => Math.min(3, s + 1))} className='rounded-lg border px-3 py-1 text-sm'>Next</button>
              </div>
            </div>

            {step === 1 && (
              <div className='grid gap-3 md:grid-cols-2'>
                {['fullName', 'email', 'phone', 'targetRole'].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className='rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
                  />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className='space-y-3'>
                <textarea
                  rows={4}
                  placeholder='Professional Summary'
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
                />
                <textarea
                  rows={3}
                  placeholder='Skills (comma separated)'
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
                />
                <textarea
                  rows={5}
                  placeholder='Experience highlights'
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950'
                />
              </div>
            )}

            {step === 3 && (
              <div className='grid gap-3 md:grid-cols-2'>
                {resumeTemplates.map((t) => (
                  <ResumeTemplateCard key={t.key} template={t} selected={template === t.key} onSelect={setTemplate} />
                ))}
              </div>
            )}

            <div className='mt-4 flex gap-2'>
              <button type='button' onClick={generateAI} className='rounded-xl bg-indigo-600 px-4 py-2 text-white'>Generate AI Suggestions</button>
              <button type='button' className='rounded-xl border px-4 py-2'>Download PDF</button>
              <button type='button' className='rounded-xl border px-4 py-2'>Download DOCX</button>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <h3 className='mb-3 font-semibold'>Drag-and-drop section order</h3>
            <div className='space-y-2'>
              {orderedSections.map((section) => (
                <div
                  key={section}
                  draggable
                  onDragStart={(e) => onDragStart(e, section)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, section)}
                  className='cursor-move rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm capitalize dark:border-slate-700'
                >
                  {section}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className='space-y-4 xl:col-span-5'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <h3 className='mb-2 font-semibold'>Real-time Preview</h3>
            <p className='text-sm text-slate-500'>{preview.fullName || 'Your Name'} · {preview.targetRole || 'Target Role'}</p>
            {orderedSections.map((section) => (
              <div key={section} className='mt-3 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-950'>
                <p className='mb-1 font-medium capitalize'>{section}</p>
                <p className='text-slate-600 dark:text-slate-300'>{preview[section] || 'No content yet.'}</p>
              </div>
            ))}
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <h3 className='font-semibold'>ATS Score</h3>
            <p className='mt-2 text-3xl font-bold text-indigo-600'>{ats?.score ?? '--'}</p>
            <ul className='mt-3 list-disc space-y-1 pl-5 text-sm text-slate-500'>
              {(ats?.suggestions || ['Generate suggestions to see ATS feedback.']).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
            <h3 className='font-semibold'>AI Suggestions</h3>
            <p className='mt-2 text-sm text-slate-500'>{ai?.summary || 'Generate AI suggestions to get summary, skills, and role predictions.'}</p>
            {ai?.predicted_roles ? (
              <p className='mt-3 text-sm'>Recommended Roles: {ai.predicted_roles.join(', ')}</p>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  )
}
