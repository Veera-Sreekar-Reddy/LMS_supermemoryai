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
}

const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [activeChat, setActiveChat] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you with your learning today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Course names for each chat
  const chatCourses = [
    'React',
    'Advanced JavaScript',
    'JAVA',
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `I understand you're asking about "${userMessage.content}". This is a mock response. In a real implementation, this would connect to your AI backend.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-16 bottom-0 w-full sm:w-[30%] max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col z-40">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <HiSparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            </div>
            <span className="text-xs text-gray-600 mt-0.5 ml-7">{chatCourses[activeChat]}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-200"
          >
            <HiX className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        {/* Chat Icons */}
        <div className="flex items-center justify-center space-x-3 px-4 py-3 border-t border-gray-200 bg-white overflow-x-auto">
          {[0, 1, 2].map((chatIndex) => (
            <button
              key={chatIndex}
              onClick={() => setActiveChat(chatIndex)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition duration-200 min-w-[80px] ${
                activeChat === chatIndex 
                  ? 'bg-green-100 hover:bg-green-200' 
                  : 'bg-yellow-100 hover:bg-yellow-200'
              }`}
              title={chatCourses[chatIndex]}
            >
              <FaRobot 
                className={`h-6 w-6 mb-1 ${
                  activeChat === chatIndex 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                }`} 
              />
              <span className={`text-xs font-medium text-center px-1 leading-tight ${
                activeChat === chatIndex 
                  ? 'text-green-700' 
                  : 'text-yellow-700'
              }`}>
                {chatCourses[chatIndex].split(' ').slice(0, 2).join(' ')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-blue-600'
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
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
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-1">
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
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
              <FaRobot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <HiPaperAirplane className="h-5 w-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI responses are for demonstration purposes
        </p>
      </div>
    </div>
  )
}

export default AIChat

