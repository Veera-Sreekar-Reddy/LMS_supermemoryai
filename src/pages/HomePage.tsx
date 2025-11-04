import { FaBook, FaClock, FaUsers, FaStar, FaPlayCircle } from 'react-icons/fa'
import { HiDocumentText, HiVideoCamera } from 'react-icons/hi'

interface HomePageProps {
  isChatOpen: boolean
}

const HomePage = ({ isChatOpen }: HomePageProps) => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'John Smith',
      thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
      duration: '12 hours',
      students: 1245,
      rating: 4.8,
      progress: 65,
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'Sarah Johnson',
      thumbnail: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      duration: '15 hours',
      students: 892,
      rating: 4.9,
      progress: 30,
    },
    {
      id: 3,
      title: 'Full Stack Development',
      instructor: 'Mike Davis',
      thumbnail: 'bg-gradient-to-br from-purple-400 to-pink-500',
      duration: '20 hours',
      students: 2156,
      rating: 4.7,
      progress: 0,
    },
    {
      id: 4,
      title: 'Data Structures & Algorithms',
      instructor: 'Emily Chen',
      thumbnail: 'bg-gradient-to-br from-green-400 to-teal-500',
      duration: '18 hours',
      students: 1678,
      rating: 4.9,
      progress: 0,
    },
  ]

  const recentActivity = [
    { id: 1, type: 'video', title: 'React Hooks Explained', course: 'Introduction to React', time: '2 hours ago' },
    { id: 2, type: 'document', title: 'JavaScript ES6+ Features', course: 'Advanced JavaScript', time: '5 hours ago' },
    { id: 3, type: 'video', title: 'Building REST APIs', course: 'Full Stack Development', time: '1 day ago' },
  ]

  return (
    <div 
      className={`min-h-screen bg-gray-50 transition-all duration-300 ${
        isChatOpen ? 'sm:mr-[30%]' : ''
      }`}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome Back, John!</h1>
          <p className="text-xl text-blue-100">Continue your learning journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
              </div>
              <FaBook className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours Watched</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">42</p>
              </div>
              <FaClock className="h-10 w-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
              </div>
              <HiDocumentText className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              </div>
              <FaStar className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200"
                  >
                    <div className={`${course.thumbnail} w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FaPlayCircle className="h-12 w-12 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <FaClock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <FaUsers className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <FaStar className="h-4 w-4 mr-1 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                      {course.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                      {course.progress > 0 ? 'Continue' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Links */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0">
                    {activity.type === 'video' ? (
                      <HiVideoCamera className="h-5 w-5 text-red-500 mt-1" />
                    ) : (
                      <HiDocumentText className="h-5 w-5 text-blue-500 mt-1" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.course}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition duration-200">
                  Browse All Courses
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition duration-200">
                  View Certificates
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition duration-200">
                  Download Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

