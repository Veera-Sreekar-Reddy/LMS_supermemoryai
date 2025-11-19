import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiPaperAirplane, HiSparkles, HiPlus, HiTrash, HiChatAlt2, HiHome } from 'react-icons/hi'
import { FaUser, FaRobot, FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import ThemeToggle from '../components/ThemeToggle'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Chat {
  id: number
  title: string
  courseTag: string
  courseColor: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatGPTPageProps {
  onLogout?: () => void
}

const ChatGPTPage = ({ onLogout }: ChatGPTPageProps) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: 'Understanding React Hooks',
      courseTag: 'React',
      courseColor: 'bg-red-500',
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hello! I'm your React AI assistant. How can I help you with React today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      courseTag: 'Adv JavaScript',
      courseColor: 'bg-green-500',
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hi! I'm your Advanced JavaScript AI assistant. What would you like to learn?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Java Programming Basics',
      courseTag: 'JAVA',
      courseColor: 'bg-orange-500',
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: "Hello! I'm your Java AI assistant. Ready to help you with Java programming!",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const [activeChatId, setActiveChatId] = useState<number | null>(chats[0]?.id || null)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const aiMenuRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find(chat => chat.id === activeChatId)
  const messages = activeChat?.messages || []

  // Close dropdowns when clicking outside
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeChatId])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '52px'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping || !activeChatId) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              updatedAt: new Date(),
            }
          : chat
      )
    )
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". This is a mock response for ${activeChat?.courseTag}. In a real implementation, this would connect to your AI backend.`,
        timestamp: new Date(),
      }
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [...chat.messages, aiResponse],
                updatedAt: new Date(),
              }
            : chat
        )
      )
      setIsTyping(false)
    }, 1000)
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: 'New Chat',
      courseTag: 'General',
      courseColor: 'bg-blue-500',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setChats(prevChats => [newChat, ...prevChats])
    setActiveChatId(newChat.id)
  }

  const handleDeleteChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setChats(prevChats => {
      const filtered = prevChats.filter(chat => chat.id !== chatId)
      if (activeChatId === chatId) {
        setActiveChatId(filtered[0]?.id || null)
      }
      return filtered
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex relative">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <HiHome className="h-5 w-5" />
              <span>Niftek</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* AI Menu Dropdown */}
            <div className="relative" ref={aiMenuRef}>
              <button
                onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
              >
                <HiSparkles className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
                </div>
              )}
            </div>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* User Menu */}
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

      {/* Left Sidebar - Chat History */}
      <div
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gray-900 dark:bg-gray-950 border-r border-gray-800 dark:border-gray-800 flex flex-col transition-transform duration-300 z-30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800 dark:border-gray-800">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-700 dark:border-gray-700"
          >
            <HiPlus className="h-5 w-5" />
            <span className="font-medium">New chat</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="space-y-1">
            {chats.map(chat => {
              const isActive = chat.id === activeChatId
              const lastMessage = chat.messages[chat.messages.length - 1]
              const preview = lastMessage?.content.substring(0, 50) || 'New conversation'

              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`group relative px-3 py-3 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? 'bg-gray-800 dark:bg-gray-800'
                      : 'hover:bg-gray-800/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-1 min-w-0">
                      {/* Course Tag */}
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${chat.courseColor} flex-shrink-0`}
                        />
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                          {chat.courseTag}
                        </span>
                      </div>
                      {/* Chat Title */}
                      <p
                        className={`text-sm font-medium truncate mb-1 ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-300 dark:text-gray-400'
                        }`}
                      >
                        {chat.title}
                      </p>
                      {/* Preview */}
                      {lastMessage && (
                        <p className="text-xs text-gray-500 dark:text-gray-600 truncate mb-1">
                          {preview}...
                        </p>
                      )}
                      {/* Date */}
                      <p className="text-xs text-gray-600 dark:text-gray-700">
                        {formatDate(chat.updatedAt)}
                      </p>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={e => handleDeleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-opacity flex-shrink-0"
                      title="Delete chat"
                    >
                      <HiTrash className="h-4 w-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 dark:border-gray-800">
          <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 text-sm">
            <HiSparkles className="h-4 w-4" />
            <span>AI Assistant</span>
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button - Only show when sidebar is open */}
      {isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="fixed left-64 top-20 z-40 p-2 bg-gray-800 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 mt-16 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mr-2"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
              {activeChat && (
                <>
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${activeChat.courseColor}`}
                  />
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {activeChat.title}
                  </h1>
                  <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                    {activeChat.courseTag}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-4 mb-4">
                  <HiSparkles className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeChat ? `How can I help you with ${activeChat.courseTag}?` : 'How can I help you today?'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Start a conversation with AI assistant. Ask me anything!
                </p>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-gray-800 dark:bg-gray-700'
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
                  className={`flex-1 max-w-3xl ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-br-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-1 ${
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
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 dark:bg-gray-700">
                  <FaRobot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Container */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <form onSubmit={handleSend} className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend(e)
                    }
                  }}
                  placeholder={activeChat ? `Message about ${activeChat.courseTag}...` : 'Message AI Assistant...'}
                  rows={1}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 overflow-hidden"
                  style={{ minHeight: '52px', maxHeight: '200px' }}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
              >
                <HiPaperAirplane className="h-5 w-5" />
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI responses are for demonstration purposes
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ChatGPTPage

