import { motion } from 'framer-motion'

export default function ResumeTemplateCard({ template, selected, onSelect }) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      type='button'
      onClick={() => onSelect(template.key)}
      className={`rounded-2xl border p-4 text-left ${selected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' : 'border-slate-200 dark:border-slate-800'}`}
    >
      <div className='mb-3 h-28 rounded-xl bg-gradient-to-br from-indigo-200 to-violet-300 dark:from-indigo-900 dark:to-violet-800' />
      <p className='text-sm font-medium'>{template.name}</p>
    </motion.button>
  )
}
