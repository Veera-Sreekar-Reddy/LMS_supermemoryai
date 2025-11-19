import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { getUser } from '../services/auth'

interface ChatDockProps {
  onLogout: () => void
}

const ChatDock = ({ onLogout }: ChatDockProps) => {
  const [isUserHovered, setIsUserHovered] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const user = getUser()

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserHovered(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    onLogout()
    setIsUserHovered(false)
  }

  return (
    <>
      {/* Dock - Always visible */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 translate-x-4">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 flex flex-col items-center space-y-4 min-w-[80px] hover:shadow-3xl transition-shadow duration-300">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="group relative p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:translate-x-2"
            title="Dashboard"
          >
            <HiHome className="h-6 w-6" />
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Dashboard
            </span>
          </Link>

          {/* User Profile */}
          <div
            ref={userMenuRef}
            className="relative"
            onMouseEnter={() => setIsUserHovered(true)}
            onMouseLeave={() => setIsUserHovered(false)}
          >
            <button
              className="group relative p-4 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:translate-x-2"
              title={user?.name || 'User'}
            >
              <FaUserCircle className="h-6 w-6" />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Profile
              </span>
            </button>

            {/* User Menu - Shows on hover */}
            {isUserHovered && (
              <div className="absolute top-0 left-full ml-4 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 overflow-hidden animate-[slideIn_0.2s_ease-out_forwards]">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
                >
                  <FiLogOut className="h-4 w-4 group-hover/item:translate-x-1 transition-transform duration-200" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatDock

