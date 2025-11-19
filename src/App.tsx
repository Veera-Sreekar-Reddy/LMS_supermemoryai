import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AIChatPage from './pages/AIChatPage'
import ChatGPTPage from './pages/ChatGPTPage'
import Navbar from './components/Navbar'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeCopilot, setActiveCopilot] = useState<'co-pilot' | 'co-pilot2'>('co-pilot')
  const navigate = useNavigate()

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/')
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <HomePage 
              isChatOpen={isChatOpen} 
              onToggleChat={toggleChat}
              activeCopilot={activeCopilot}
              onCopilotChange={setActiveCopilot}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/chat"
        element={
          isAuthenticated ? (
            <AIChatPage isChatOpen={isChatOpen} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/chat-gpt"
        element={
          isAuthenticated ? (
            <ChatGPTPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

