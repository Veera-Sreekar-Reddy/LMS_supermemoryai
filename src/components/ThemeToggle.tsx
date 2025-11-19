import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
    >
      {/* Toggle Track */}
      <div
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      />
      
      {/* Toggle Thumb with Icons */}
      <div
        className={`absolute left-0.5 top-0.5 bottom-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <HiMoon className="h-3.5 w-3.5 text-blue-600" />
        ) : (
          <HiSun className="h-3.5 w-3.5 text-yellow-500" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle

