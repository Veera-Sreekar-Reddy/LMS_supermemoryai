import { Link, useLocation } from 'react-router-dom'
import { HiChartBar, HiAcademicCap, HiCalendar, HiUserGroup, HiDocumentText, HiRefresh, HiStar, HiCog, HiLink, HiChatAlt2, HiChat } from 'react-icons/hi'
import { useState } from 'react'

const AcmeSidebar = () => {
  const location = useLocation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const navItems = [
    { icon: HiChartBar, label: 'Dashboard', path: '/dashboard' },
    { icon: HiChat, label: 'AI Chat', path: '/chat' },
    { icon: HiAcademicCap, label: 'Courses', path: '/courses' },
    { icon: HiCalendar, label: 'Calendar', path: '/calendar' },
    { icon: HiUserGroup, label: 'Learners', path: '/learners' },
    { icon: HiDocumentText, label: 'Documents', path: '/documents' },
    { icon: HiRefresh, label: 'Sync', path: '/sync' },
    { icon: HiStar, label: 'Favorites', path: '/favorites' },
    { icon: HiCog, label: 'Settings', path: '/settings' },
    { icon: HiLink, label: 'Links', path: '/links' },
    { icon: HiChatAlt2, label: 'Messages', path: '/messages' },
  ]

  return (
    <div className="w-16 bg-gray-800 dark:bg-gray-900 h-screen fixed left-0 top-0 flex flex-col items-center py-4 z-50">
      {/* Logo */}
      

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-2 flex-1 relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={item.path}
                className={`p-3 rounded-lg transition-colors block ${
                  isActive
                    ? 'bg-gray-700 dark:bg-gray-800 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={item.label}
              >
                <item.icon className="h-5 w-5" />
              </Link>
              {/* Tooltip */}
              {hoveredIndex === index && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AcmeSidebar

