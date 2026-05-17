export default function StaticPage({ title, description }) {
  return (
    <div className='mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <p className='mt-3 text-slate-500'>{description}</p>
    </div>
  )
}
