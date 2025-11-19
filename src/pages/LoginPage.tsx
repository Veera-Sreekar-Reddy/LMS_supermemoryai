import { useState, FormEvent } from 'react'
import { FaBook, FaGoogle, FaGithub, FaGraduationCap, FaBookOpen } from 'react-icons/fa'
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiXCircle, HiAcademicCap } from 'react-icons/hi'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginPageProps {
  onLogin?: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Mock user credentials
  const MOCK_USER = {
    email: 'student@domain.com',
    password: 'student123',
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Validate against mock user
      if (form.email === MOCK_USER.email && form.password === MOCK_USER.password) {
        // Store mock auth token
        localStorage.setItem('access_token', 'mock_token')
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: form.email,
          name: 'Demo User'
        }))
        
        // Call onLogin callback to update authentication state
        if (onLogin) {
          onLogin()
        }
      } else {
        setError('Invalid email or password. Use student@domain.com / student123')
      }
    } catch (err: any) {
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* LMS-themed Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Floating geometric shapes for LMS theme */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Educational icon patterns */}
        <div className="absolute top-1/4 left-1/4 text-white/5 transform -rotate-12">
          <FaGraduationCap className="w-32 h-32" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-white/5 transform rotate-12">
          <FaBookOpen className="w-40 h-40" />
        </div>
        <div className="absolute top-1/2 right-1/3 text-white/5 transform -rotate-45">
          <HiAcademicCap className="w-36 h-36" />
        </div>
      </div>
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/10 z-[1]"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Title Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500/90 to-purple-500/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/30 mb-4">
            <FaBook className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">Welcome</h2>
          <p className="mt-2 text-sm text-white/90 drop-shadow-md">Sign in to your account</p>
        </div>

        {/* Login Form Card with Glass Effect */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20 dark:border-gray-700/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition duration-200 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition duration-200 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={form.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            {/* Submit Button with Glass Effect */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-white/30 dark:border-gray-600/30 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600/90 to-purple-600/90 dark:from-blue-500/90 dark:to-purple-500/90 backdrop-blur-md hover:from-blue-500/95 hover:to-purple-500/95 dark:hover:from-blue-400/95 dark:hover:to-purple-400/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400/50 dark:focus:ring-blue-300/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:border-white/40 dark:hover:border-gray-500/40"
            >
              {!isLoading && (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <HiLockClosed className="h-5 w-5 text-blue-200 group-hover:text-blue-100" />
                </span>
              )}
              <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons with Glass Effect */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="group w-full inline-flex justify-center py-2.5 px-4 border border-white/30 dark:border-gray-600/30 rounded-lg shadow-md bg-white/80 dark:bg-gray-700/80 backdrop-blur-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:border-white/40 dark:hover:border-gray-500/40 hover:shadow-lg transition-all duration-200"
            >
              <FaGoogle className="h-5 w-5 text-red-500 group-hover:text-red-600" />
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              className="group w-full inline-flex justify-center py-2.5 px-4 border border-white/30 dark:border-gray-600/30 rounded-lg shadow-md bg-white/80 dark:bg-gray-700/80 backdrop-blur-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:border-white/40 dark:hover:border-gray-500/40 hover:shadow-lg transition-all duration-200"
            >
              <FaGithub className="h-5 w-5 text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white" />
              <span className="ml-2">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition duration-200 ml-1"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <HiXCircle className="h-5 w-5 text-red-400 dark:text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage

