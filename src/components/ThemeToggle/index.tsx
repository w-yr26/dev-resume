import { useEffect, useState } from 'react'
import { Button } from 'antd'
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    !!localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    // 非暗黑风格
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <Button type="primary" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '明亮风格' : '暗黑风格'}
    </Button>
  )
}

export default ThemeToggle
