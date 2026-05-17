import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const testimonials = [
  { name: 'Aisha', quote: 'My ATS score jumped from 61 to 89 in one evening.' },
  { name: 'Daniel', quote: 'The templates look premium and got me more interview calls.' },
]

export default function LandingPage() {
  return (
    <div className='space-y-20'>
      <section className='grid gap-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white md:grid-cols-2'>
        <div>
          <p className='mb-3 text-sm uppercase tracking-[0.2em] text-white/80'>AI Resume Builder</p>
          <h1 className='text-4xl font-bold leading-tight'>Build ATS-optimized resumes with premium templates.</h1>
          <p className='mt-4 text-white/85'>Generate summaries, optimize keywords, check ATS score, and export in PDF/DOCX.</p>
          <div className='mt-6 flex gap-3'>
            <Link to='/builder' className='rounded-xl bg-white px-5 py-2.5 font-medium text-indigo-700'>Start Building</Link>
            <Link to='/pricing' className='rounded-xl border border-white/60 px-5 py-2.5'>View Pricing</Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='rounded-2xl bg-black/20 p-5 backdrop-blur'>
          <p className='text-sm text-white/80'>Live ATS Insight</p>
          <p className='mt-2 text-4xl font-bold'>92</p>
          <p className='mt-2 text-sm text-white/80'>Score after AI keyword optimization + quantified impact bullets</p>
        </motion.div>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        {['AI Suggestions', '10+ Premium Templates', 'Job Prediction'].map((feature) => (
          <div key={feature} className='rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900'>
            <h3 className='font-semibold'>{feature}</h3>
            <p className='mt-2 text-sm text-slate-500'>Production-style architecture with modern UX and smooth transitions.</p>
          </div>
        ))}
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Testimonials</h2>
        <div className='grid gap-4 md:grid-cols-2'>
          {testimonials.map((t) => (
            <blockquote key={t.name} className='rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900'>
              “{t.quote}”
              <footer className='mt-3 text-sm text-slate-500'>— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}
