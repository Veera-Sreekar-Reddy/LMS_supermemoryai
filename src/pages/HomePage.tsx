import { FaArrowUp, FaArrowDown, FaRegSadTear, FaMeh, FaSmile, FaLaugh, FaHeart, FaStar, FaClock, FaUser, FaUserCircle } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight, HiVideoCamera, HiDocumentText, HiClipboardList, HiBookOpen, HiAcademicCap, HiSparkles, HiChatAlt2 } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AcmeSidebar from '../components/Sidebar'
import AIChat from '../components/AIChat'
import AIChat2 from '../components/AIChat2'
import ThemeToggle from '../components/ThemeToggle'

interface HomePageProps {
  isChatOpen: boolean
  onToggleChat?: () => void
  activeCopilot?: 'co-pilot' | 'co-pilot2'
  onCopilotChange?: (copilot: 'co-pilot' | 'co-pilot2') => void
  onLogout?: () => void
}

const HomePage = ({ isChatOpen, onToggleChat, activeCopilot = 'co-pilot', onCopilotChange, onLogout }: HomePageProps) => {
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const aiMenuRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setIsAIMenuOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const learnerReactions = [
    { emoji: <FaRegSadTear className="h-6 w-6" />, count: 14 },
    { emoji: <FaMeh className="h-6 w-6" />, count: 24 },
    { emoji: <FaSmile className="h-6 w-6" />, count: 256 },
    { emoji: <FaLaugh className="h-6 w-6" />, count: 324 },
    { emoji: <FaHeart className="h-6 w-6" />, count: 523 },
  ]

  const topCourses = [
    { name: 'Introduction to React', progress: 76, completed: 34, total: 43, initials: 'IR' },
    { name: 'Advanced JavaScript', progress: 67, completed: 29, total: 43, initials: 'AJ' },
    { name: 'Full Stack Development', progress: 55, completed: 27, total: 43, initials: 'FS' },
  ]

  // Web graph data for courses and student interest
  const courseInterestData = [
    { course: 'React', interest: 85 },
    { course: 'JavaScript', interest: 92 },
    { course: 'Python', interest: 78 },
    { course: 'AWS', interest: 65 },
    { course: 'UI/UX', interest: 70 },
    { course: 'ML', interest: 88 },
  ]

  const newCourses = [
    { 
      title: 'Machine Learning Fundamentals', 
      description: 'Learn the basics of machine learning algorithms and neural networks',
      instructor: 'Dr. Sarah Chen',
      duration: '8 weeks',
      students: 1240,
      rating: 4.8
    },
    { 
      title: 'Cloud Computing with AWS', 
      description: 'Master AWS services and deploy scalable cloud infrastructure',
      instructor: 'Michael Thompson',
      duration: '6 weeks',
      students: 890,
      rating: 4.9
    },
    { 
      title: 'UI/UX Design Principles', 
      description: 'Create beautiful and intuitive user interfaces with modern design tools',
      instructor: 'Emma Rodriguez',
      duration: '10 weeks',
      students: 1567,
      rating: 4.7
    },
  ]

  const upcomingEvents = [
    { icon: HiVideoCamera, title: 'Mastering Google Analytics 4: From Begin...', time: '07:10 PM - 10:00 PM' },
    { icon: HiBookOpen, title: 'Introduction to Data Science with Python', time: 'Lessons opens at 08:51 PM' },
    { icon: HiDocumentText, title: 'Advanced SEO Strategies for Digital Marke...', time: 'Assignments opens at 08:51 PM' },
    { icon: HiClipboardList, title: 'Comprehensive Guide to Machine Learning', time: 'Quiz opens at 08:51 PM' },
    { icon: HiAcademicCap, title: 'Social Media Marketing', time: 'Module opens at 08:51 PM', activities: '12 activities' },
  ]

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()
  const currentDay = today.getDate()

  const calendarDays = []
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + (direction === 'next' ? 1 : -1), 1))
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Sidebar */}
      <AcmeSidebar />

      {/* Main Content Area */}
      <div className={`flex-1 ml-16 transition-all duration-300 ${isChatOpen ? 'mr-[30%]' : ''}`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Niftek</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative" ref={aiMenuRef}>
                <button
                  onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                >
                  <HiSparkles className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  {isChatOpen && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
                  )}
                </button>
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
                        // Check current state before making changes
                        const isCurrentlyActive = activeCopilot === 'co-pilot' && isChatOpen
                        
                        if (onCopilotChange) onCopilotChange('co-pilot')
                        
                        // Only toggle if chat is closed, or if clicking the same active copilot
                        if (onToggleChat) {
                          if (!isChatOpen) {
                            onToggleChat() // Open chat if closed
                          } else if (!isCurrentlyActive) {
                            // Chat is open but different copilot - just switch, don't toggle
                            // The copilot change will handle the switch, chat stays open
                          } else {
                            // Same copilot and chat is open - close it
                            onToggleChat()
                          }
                        }
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
                        // Check current state before making changes
                        const isCurrentlyActive = activeCopilot === 'co-pilot2' && isChatOpen
                        
                        if (onCopilotChange) onCopilotChange('co-pilot2')
                        
                        // Only toggle if chat is closed, or if clicking the same active copilot
                        if (onToggleChat) {
                          if (!isChatOpen) {
                            onToggleChat() // Open chat if closed
                          } else if (!isCurrentlyActive) {
                            // Chat is open but different copilot - just switch, don't toggle
                            // The copilot change will handle the switch, chat stays open
                          } else {
                            // Same copilot and chat is open - close it
                            onToggleChat()
                          }
                        }
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
              <ThemeToggle />
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaUserCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    9
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <button
                      onClick={() => {
                        if (onLogout) {
                          onLogout()
                          setIsUserMenuOpen(false)
                        }
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Row - Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* On Track Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <FaArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">On track</h3>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">504</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active last 3 days</p>
                </div>

                {/* Need Reminder Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <FaArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need reminder</h3>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">34</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Not active last 3 days</p>
                </div>

                {/* Learner Reactions Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Learner reactions</h3>
                    <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer">
                      <option>All time</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {learnerReactions.map((reaction, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-2 text-gray-600 dark:text-gray-400">
                          {reaction.emoji}
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{reaction.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Progress Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Course progress</h3>
                    <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer">
                      <option>Top courses</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    {topCourses.map((course, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {course.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.name}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <span>{course.progress}%</span>
                              <span>{course.completed}/{course.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
                    See full progress &gt;
                  </a>
                </div>

                {/* Course Interest Web Graph Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Course Interest</h3>
                    <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer">
                      <option>All courses</option>
                    </select>
                  </div>
                  <div className="flex flex-col items-center justify-center py-4">
                    <svg width="280" height="280" viewBox="0 0 280 280" className="overflow-visible">
                      <defs>
                        <linearGradient id="interestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid circles */}
                      <circle cx="140" cy="140" r="100" fill="none" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
                      <circle cx="140" cy="140" r="75" fill="none" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
                      <circle cx="140" cy="140" r="50" fill="none" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
                      <circle cx="140" cy="140" r="25" fill="none" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
                      
                      {/* Grid lines */}
                      {courseInterestData.map((_, index) => {
                        const angle = (index * 360) / courseInterestData.length - 90
                        const radian = (angle * Math.PI) / 180
                        const x1 = 140
                        const y1 = 140
                        const x2 = 140 + 100 * Math.cos(radian)
                        const y2 = 140 + 100 * Math.sin(radian)
                        return (
                          <line
                            key={`grid-${index}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                            className="dark:stroke-gray-700"
                          />
                        )
                      })}
                      
                      {/* Interest area polygon */}
                      <polygon
                        points={courseInterestData.map((data, index) => {
                          const angle = (index * 360) / courseInterestData.length - 90
                          const radian = (angle * Math.PI) / 180
                          const radius = (data.interest / 100) * 100
                          const x = 140 + radius * Math.cos(radian)
                          const y = 140 + radius * Math.sin(radian)
                          return `${x},${y}`
                        }).join(' ')}
                        fill="url(#interestGradient)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      
                      {/* Data points and labels */}
                      {courseInterestData.map((data, index) => {
                        const angle = (index * 360) / courseInterestData.length - 90
                        const radian = (angle * Math.PI) / 180
                        const radius = (data.interest / 100) * 100
                        const x = 140 + radius * Math.cos(radian)
                        const y = 140 + radius * Math.sin(radian)
                        const labelX = 140 + 115 * Math.cos(radian)
                        const labelY = 140 + 115 * Math.sin(radian)
                        
                        return (
                          <g key={index}>
                            <circle
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#3b82f6"
                              className="dark:fill-blue-400"
                            />
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="11"
                              fill="#374151"
                              className="dark:fill-gray-300 font-medium"
                            >
                              {data.course}
                            </text>
                            <text
                              x={x}
                              y={y - 8}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="9"
                              fill="#3b82f6"
                              className="dark:fill-blue-400 font-semibold"
                            >
                              {data.interest}%
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                      Student interest percentage by course
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New Courses You Can Register Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">New courses you can register</h3>
                  <div className="space-y-4">
                    {newCourses.map((course, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{course.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <FaUser className="h-3 w-3 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <FaClock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <FaStar className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                            {course.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{course.students.toLocaleString()} students</span>
                          <button className="text-xs px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium">
                            Register
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Feedback Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Last feedback</h3>
                    <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none cursor-pointer">
                      <option>Week</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">😊</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Learner anonymously left a comment in
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                          Provide examples of when you would need to Overall, the lesson on GA4 was incredibly informative and well-structured. The instructor did an excellent job explaining the new features and differences from Universal Analytics.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">10 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Calendar */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => changeMonth('prev')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <HiChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => changeMonth('next')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <HiChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="aspect-square"></div>
                    }
                    const isCurrentDay = isCurrentMonth && day === currentDay
                    const isHighlighted = day === 16
                    return (
                      <div
                        key={index}
                        className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                          isCurrentDay
                            ? 'bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 font-semibold'
                            : isHighlighted
                            ? 'border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Upcoming</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                        <event.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{event.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{event.time}</p>
                        {event.activities && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{event.activities}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Components */}
      {activeCopilot === 'co-pilot' ? (
        <AIChat isOpen={isChatOpen} onClose={onToggleChat || (() => {})} />
      ) : activeCopilot === 'co-pilot2' ? (
        <AIChat2 isOpen={isChatOpen} onClose={onToggleChat || (() => {})} />
      ) : null}
    </div>
  )
}

export default HomePage
