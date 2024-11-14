import { useState } from '#app'

export const useTheme = () => {
  const isDark = useState('dark', () => true)
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
  }

  return {
    isDark,
    toggleTheme
  }
}