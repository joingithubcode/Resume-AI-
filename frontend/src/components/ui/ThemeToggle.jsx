import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleTheme } from '../../store/themeSlice'

export default function ThemeToggle() {
  const mode = useSelector((s) => s.theme.mode)
  const dispatch = useDispatch()

  return (
    <button
      type='button'
      onClick={() => dispatch(toggleTheme())}
      className='rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700'
    >
      <span className='inline-flex items-center gap-2'>
        {mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        {mode === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
