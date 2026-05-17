import { createSlice } from '@reduxjs/toolkit'

const getInitialMode = () => localStorage.getItem('theme') || 'light'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialMode() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode)
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
    hydrateTheme(state) {
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
  },
})

export const { toggleTheme, hydrateTheme } = themeSlice.actions
export default themeSlice.reducer
