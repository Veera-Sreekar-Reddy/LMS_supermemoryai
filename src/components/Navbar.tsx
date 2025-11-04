import { useState, useRef, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { getUser } from '../services/auth'
import AIChat from './AIChat'

interface NavbarProps {
  isChatOpen: boolean
  onToggleChat: () => void
  onLogout: () => void
}

const Navbar = ({ isChatOpen, onToggleChat, onLogout }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const user = getUser()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    onLogout()
    setIsDropdownOpen(false)
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LMS Portal
              </h1>
            </div>

            {/* Right side - AI Chat Icon and Profile */}
            <div className="flex items-center space-x-4">
              {/* AI Chat Icon */}
              <button
                onClick={onToggleChat}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                title="AI Chat"
              >
                <HiSparkles className="h-6 w-6" />
                {isChatOpen && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                >
                  <FaUserCircle className="h-8 w-8 text-gray-400" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                  <IoIosArrowDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                    >
                      <FiLogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* AI Chat Component */}
      <AIChat isOpen={isChatOpen} onClose={onToggleChat} />
    </>
  )
}

export default Navbar

