export default function AnalyticsCard({ title, value, note }) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
      <p className='text-sm text-slate-500'>{title}</p>
      <p className='mt-1 text-2xl font-semibold'>{value}</p>
      {note ? <p className='mt-1 text-xs text-emerald-500'>{note}</p> : null}
    </div>
  )
}
