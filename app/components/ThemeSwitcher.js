'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeSwitcher
