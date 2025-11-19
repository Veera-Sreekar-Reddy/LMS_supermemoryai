import { useState } from 'react'
import { HiMenu, HiChevronDown, HiChevronRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const DashboardSidebar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true)
  const [isAppsOpen, setIsAppsOpen] = useState(false)
  const [isComponentsOpen, setIsComponentsOpen] = useState(false)
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeDashboard, setActiveDashboard] = useState('Dashboard 7')

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <HiMenu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LMS Portal
          </h1>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="p-4 space-y-6">
        {/* DASHBOARD & APPS */}
        <div>
          <button
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <span>DASHBOARD & APPS</span>
          </button>
          <div className="space-y-1">
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <span>Dashboard</span>
              {isDashboardOpen ? (
                <HiChevronDown className="h-4 w-4" />
              ) : (
                <HiChevronRight className="h-4 w-4" />
              )}
            </button>
            {isDashboardOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveDashboard(`Dashboard ${num}`)}
                    className={`w-full flex items-center px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeDashboard === `Dashboard ${num}`
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {activeDashboard === `Dashboard ${num}` && (
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    )}
                    <span>Dashboard {num}</span>
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsAppsOpen(!isAppsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>Apps</span>
              {isAppsOpen ? (
                <HiChevronDown className="h-4 w-4" />
              ) : (
                <HiChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* COMPONENTS & UI */}
        <div>
          <button className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <span>COMPONENTS & UI</span>
          </button>
          <div className="space-y-1">
            <button
              onClick={() => setIsComponentsOpen(!isComponentsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>UI Elements</span>
              {isComponentsOpen ? (
                <HiChevronDown className="h-4 w-4" />
              ) : (
                <HiChevronRight className="h-4 w-4" />
              )}
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span>Forms & Tables</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span>Charts</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* COLLECTIONS */}
        <div>
          <button className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <span>COLLECTIONS</span>
          </button>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span>Widgets</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span>Ecommerce</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <span>Pages</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* LOGIN & ERROR */}
        <div>
          <button className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <span>LOGIN & ERROR</span>
          </button>
          <div className="space-y-1">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>Authentication</span>
              {isLoginOpen ? (
                <HiChevronDown className="h-4 w-4" />
              ) : (
                <HiChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar

