export default function Footer() {
  return (
    <footer className='border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-800'>
      © {new Date().getFullYear()} ResumeAI Pro · Built for modern resume workflows.
    </footer>
  )
}
