import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiSparkles, HiChatAlt2 } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { getUser } from '../services/auth'
import AIChat from './AIChat'
import AIChat2 from './AIChat2'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  isChatOpen: boolean
  onToggleChat: () => void
  onLogout: () => void
  activeCopilot?: 'co-pilot' | 'co-pilot2'
  onCopilotChange?: (copilot: 'co-pilot' | 'co-pilot2') => void
}

const Navbar = ({ isChatOpen, onToggleChat, onLogout, activeCopilot = 'co-pilot', onCopilotChange }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const aiMenuRef = useRef<HTMLDivElement>(null)
  const user = getUser()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setIsAIMenuOpen(false)
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LMS Portal
              </h1>
            </div>

            {/* Right side - AI Chat Link, AI Menu, Theme Toggle, and Profile */}
            <div className="flex items-center space-x-4">
              {/* AI Chat Page Link */}
              <Link
                to="/chat"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition duration-200"
              >
                <HiChatAlt2 className="h-5 w-5" />
                <span>AI Chat</span>
              </Link>

              {/* AI Chat Menu Dropdown */}
              <div className="relative" ref={aiMenuRef}>
                <button
                  onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
                  className="relative flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition duration-200"
                >
                  <HiSparkles className="h-5 w-5" />
                  <span>AI Assistant</span>
                  {isChatOpen && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
                  )}
                  <IoIosArrowDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isAIMenuOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* AI Menu Dropdown */}
                {isAIMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    {/* Full Page Chat Options */}
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Full Page Chats
                      </p>
                    </div>
                    <Link
                      to="/chat"
                      onClick={() => setIsAIMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                    >
                      <HiChatAlt2 className="h-4 w-4" />
                      <span>AI Chat Page</span>
                    </Link>
                    <Link
                      to="/chat-gpt"
                      onClick={() => setIsAIMenuOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                    >
                      <HiSparkles className="h-4 w-4" />
                      <span>ChatGPT Style Page</span>
                    </Link>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    
                    {/* Sidebar Chat Components */}
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Sidebar Chats
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (onCopilotChange) onCopilotChange('co-pilot')
                        if (!isChatOpen) onToggleChat()
                        setIsAIMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition duration-150 ${
                        activeCopilot === 'co-pilot' && isChatOpen
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <HiSparkles className="h-4 w-4" />
                      <span>Co-Pilot</span>
                      {isChatOpen && activeCopilot === 'co-pilot' && (
                        <span className="ml-auto h-2 w-2 bg-green-500 rounded-full"></span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (onCopilotChange) onCopilotChange('co-pilot2')
                        if (!isChatOpen) onToggleChat()
                        setIsAIMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition duration-150 ${
                        activeCopilot === 'co-pilot2' && isChatOpen
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <HiSparkles className="h-4 w-4" />
                      <span>Co-Pilot 2</span>
                      {isChatOpen && activeCopilot === 'co-pilot2' && (
                        <span className="ml-auto h-2 w-2 bg-green-500 rounded-full"></span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-200"
                >
                  <FaUserCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name || 'User'}
                  </span>
                  <IoIosArrowDown
                    className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
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
      {activeCopilot === 'co-pilot' ? (
        <AIChat isOpen={isChatOpen} onClose={onToggleChat} />
      ) : activeCopilot === 'co-pilot2' ? (
        <AIChat2 isOpen={isChatOpen} onClose={onToggleChat} />
      ) : null}
    </>
  )
}

export default Navbar

