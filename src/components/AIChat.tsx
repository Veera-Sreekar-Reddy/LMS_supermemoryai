import { useState, useRef, useEffect } from 'react'
import { HiSparkles, HiX, HiPaperAirplane } from 'react-icons/hi'
import { FaUser, FaRobot } from 'react-icons/fa'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  isOpen: boolean
  onClose: () => void
  activeCopilot?: 'co-pilot' | 'co-pilot2'
}

interface ChatState {
  messages: Message[]
  input: string
}

const AIChat = ({ isOpen, onClose }: AIChatProps) => {

  const [activeChat, setActiveChat] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({ 0: 2, 1: 0, 2: 5 })
  const [lastSeenCounts, setLastSeenCounts] = useState<Record<number, number>>({ 0: 1, 1: 1, 2: 1 })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Course names for each chat
  const chatCourses = [
    'React',
    'Adv JavaScript',
    'JAVA',
  ]

  // Separate state for each chat - using function to initialize once
  const [chats, setChats] = useState<Record<number, ChatState>>(() => ({
    0: {
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hello! I'm your React AI assistant. How can I help you with React today?",
          timestamp: new Date(),
        },
      ],
      input: '',
    },
    1: {
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hi! I'm your Advanced JavaScript AI assistant. What would you like to learn?",
          timestamp: new Date(),
        },
      ],
      input: '',
    },
    2: {
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hello! I'm your Java AI assistant. Ready to help you with Java programming!",
          timestamp: new Date(),
        },
      ],
      input: '',
    },
  }))

  const currentChat = chats[activeChat]
  const messages = currentChat.messages
  const input = currentChat.input

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length, isTyping])

  // Track unread messages for inactive chats
  useEffect(() => {
    [0, 1, 2].forEach((chatIndex) => {
      if (chatIndex !== activeChat) {
        const chatMessages = chats[chatIndex].messages
        const lastSeen = lastSeenCounts[chatIndex] || 1
        const newMessagesCount = Math.max(0, chatMessages.length - lastSeen)
        if (newMessagesCount > 0) {
          setUnreadCounts((prev) => ({
            ...prev,
            [chatIndex]: newMessagesCount,
          }))
        }
      } else {
        // Clear unread count for active chat
        setUnreadCounts((prev) => ({
          ...prev,
          [chatIndex]: 0,
        }))
      }
    })
  }, [chats, activeChat, lastSeenCounts])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, activeChat])


  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setChats((prev) => ({
      ...prev,
      [activeChat]: {
        ...prev[activeChat],
        messages: [...prev[activeChat].messages, userMessage],
        input: '',
      },
    }))
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". This is a mock response for ${chatCourses[activeChat]}. In a real implementation, this would connect to your AI backend.`,
        timestamp: new Date(),
      }
      setChats((prev) => ({
        ...prev,
        [activeChat]: {
          ...prev[activeChat],
          messages: [...prev[activeChat].messages, aiResponse],
        },
      }))
      // Update last seen count for active chat
      setLastSeenCounts((prev) => ({
        ...prev,
        [activeChat]: (prev[activeChat] || 0) + 2, // +2 for user message and AI response
      }))
      setIsTyping(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChats((prev) => ({
      ...prev,
      [activeChat]: {
        ...prev[activeChat],
        input: e.target.value,
      },
    }))
  }

  const handleChatChange = (index: number) => {
    if (index === activeChat) return
    
    setIsTyping(false)
    setActiveChat(index)
    // Clear unread count and update last seen count for the opened chat
    setUnreadCounts((prev) => ({
      ...prev,
      [index]: 0,
    }))
    setLastSeenCounts((prev) => ({
      ...prev,
      [index]: chats[index].messages.length,
    }))
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-full sm:w-[30%] max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-l border-gray-200/50 dark:border-gray-800/50 shadow-2xl flex flex-col z-40 overflow-hidden"
    >
      {/* Header with Pill Navigation */}
      <div className="border-b border-gray-200/50 dark:border-gray-800/50 relative z-20">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center space-x-2">
            <HiSparkles className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-200"
          >
            <HiX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Pill Navigation with Slide Effect */}
        <div className="px-4 pb-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex items-center space-x-1 relative">
            {[0, 1, 2].map((chatIndex) => {
              // Course status: 0 = completed, 1 = active, 2 = upcoming
              const isCompleted = chatIndex === 0
              const isActive = chatIndex === 1
              const isUpcoming = chatIndex === 2
              const isSelected = activeChat === chatIndex

              // Color classes based on status
              const getStatusColors = () => {
                if (isSelected) {
                  if (isCompleted) {
                    return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700'
                  } else if (isActive) {
                    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
                  } else if (isUpcoming) {
                    return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700'
                  }
                } else {
                  if (isCompleted) {
                    return 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  } else if (isActive) {
                    return 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                  } else if (isUpcoming) {
                    return 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                  }
                }
                return 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }

              const unreadCount = unreadCounts[chatIndex] || 0

              return (
                <button
                  key={chatIndex}
                  onClick={() => handleChatChange(chatIndex)}
                  className={`chat-tab flex-1 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm relative z-10 ${
                    isSelected
                      ? `${getStatusColors()} shadow-md scale-105`
                      : `${getStatusColors()}`
                  }`}
                >
                  {chatCourses[chatIndex]}
                  {unreadCount > 0 && !isSelected && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 shadow-lg animate-pulse">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500'
              }`}
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
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-700/50'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1.5 px-1.5 ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-md">
              <FaRobot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-2.5 rounded-2xl bg-white border border-gray-200/50 shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
            placeholder={`Ask about ${chatCourses[activeChat]}...`}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
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

export default AIChat

