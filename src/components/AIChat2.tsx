import { useState, useRef, useEffect } from 'react'
import { HiSparkles, HiX, HiPaperAirplane } from 'react-icons/hi'
import { FaUser, FaRobot } from 'react-icons/fa'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  course?: string
}

interface AIChat2Props {
  isOpen: boolean
  onClose: () => void
}

interface ChatState {
  messages: Message[]
  input: string
}

const AIChat2 = ({ isOpen, onClose }: AIChat2Props) => {
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Available courses
  const courses = [
    { id: 'react', name: 'React', color: 'blue' },
    { id: 'javascript', name: 'Adv JavaScript', color: 'yellow' },
    { id: 'java', name: 'JAVA', color: 'orange' },
    { id: 'python', name: 'Python', color: 'green' },
  ]

  // Single unified message list
  const [chatState, setChatState] = useState<ChatState>(() => {
    const now = new Date()
    return {
      messages: [
        
        {
          id: 2,
          role: 'assistant',
          content: "React Hooks are functions that let you use state and other React features in functional components. The most common ones are useState for managing state and useEffect for side effects. Would you like me to explain any specific hook in detail?",
          timestamp: new Date(now.getTime() - 105000), // 1.75 minutes ago
          course: 'react',
        },
        {
          id: 3,
          role: 'assistant',
          content: "In Advanced JavaScript, closures are a powerful concept where inner functions have access to outer function variables even after the outer function has returned. This is fundamental for understanding how JavaScript manages scope and can be used for creating private variables and function factories.",
          timestamp: new Date(now.getTime() - 60000), // 1 minute ago
          course: 'javascript',
        },
        {
          id: 4,
          role: 'assistant',
          content: "In JAVA, the Object-Oriented Programming (OOP) principles include Encapsulation, Inheritance, Polymorphism, and Abstraction. These concepts help in creating modular, reusable, and maintainable code. Would you like to dive deeper into any specific OOP concept?",
          timestamp: new Date(now.getTime() - 30000), // 30 seconds ago
          course: 'java',
        },
      ],
      input: '',
    }
  })

  const messages = chatState.messages
  const input = chatState.input

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
      course: selectedCourse || undefined,
    }

    const currentCourse = selectedCourse
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: '',
    }))
    setSelectedCourse('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". This is a mock response from Co-Pilot 2. In a real implementation, this would connect to your AI backend.`,
        timestamp: new Date(),
        course: currentCourse || undefined,
      }
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
      }))
      setIsTyping(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatState((prev) => ({
      ...prev,
      input: e.target.value,
    }))
  }

  const getCourseColorClasses = (courseId?: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return {
      bg: 'bg-purple-100 dark:bg-purple-900/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800',
    }

    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/40',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/40',
        text: 'text-yellow-700 dark:text-yellow-300',
        border: 'border-yellow-200 dark:border-yellow-800',
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/40',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800',
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/40',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800',
      },
    }

    return colorMap[course.color] || colorMap.blue
  }

  const getCourseGradient = (courseId?: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return 'from-purple-500 to-purple-600'

    const gradientMap: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-yellow-500 to-yellow-600',
      orange: 'from-orange-500 to-orange-600',
      green: 'from-green-500 to-green-600',
    }

    return gradientMap[course.color] || 'from-purple-500 to-purple-600'
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-full sm:w-[30%] max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-l border-gray-200/50 dark:border-gray-800/50 shadow-2xl flex flex-col z-40 overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-gray-200/50 dark:border-gray-800/50 relative z-20">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center space-x-2">
            <HiSparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-200"
          >
            <HiX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-white dark:from-gray-900 dark:to-gray-800 relative z-10">
        {messages.map((message) => {
          const courseColors = getCourseColorClasses(message.course)
          const courseGradient = getCourseGradient(message.course)
          const courseName = message.course ? courses.find(c => c.id === message.course)?.name : null

          return (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br ${courseGradient}`}
              >
                {message.role === 'user' ? (
                  <FaUser className="h-4 w-4 text-white" />
                ) : (
                  <FaRobot className="h-4 w-4 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-[80%] ${
                  message.role === 'user' ? 'text-right' : ''
                }`}
              >
                <div
                  className={`inline-block px-4 py-2.5 rounded-2xl shadow-sm ${
                    message.role === 'user'
                      ? `bg-gradient-to-r ${courseGradient} text-white`
                      : `bg-purple-50 dark:bg-purple-900/20 text-gray-900 dark:text-gray-100 border border-purple-200 dark:border-purple-800`
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                <div className={`flex items-center gap-1.5 mt-1.5 px-1.5 flex-wrap ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {courseName && (
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${courseColors.bg} ${courseColors.text} border ${courseColors.border}`}>
                      {courseName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
              <FaRobot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Co-Pilot 2..."
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-500 dark:to-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            <HiPaperAirplane className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          AI responses are for demonstration purposes
        </p>
      </div>
    </div>
  )
}

export default AIChat2

