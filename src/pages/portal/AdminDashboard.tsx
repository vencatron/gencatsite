import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, AdminStats } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user: currentUser } = usePortalAuth()

  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }
    loadStats()
  }, [isAdmin])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getAdminStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">Admin privileges required to view this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{error}</p>
          <button onClick={loadStats} className="text-red-600 text-sm mt-2 hover:underline">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      subtitle: `${stats.activeUsers} active, ${stats.inactiveUsers} inactive`,
      color: 'primary',
      icon: '👥',
    },
    {
      title: 'Documents',
      value: stats.totalDocuments,
      subtitle: 'Total uploaded',
      color: 'secondary',
      icon: '📄',
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      subtitle: `${stats.unreadMessages} unread`,
      color: 'accent',
      icon: '💬',
    },
    {
      title: 'Invoices',
      value: stats.totalInvoices,
      subtitle: `${stats.pendingInvoices} pending`,
      color: 'neutral',
      icon: '💵',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      subtitle: 'All time',
      color: 'primary',
      icon: '💰',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600">Overview of system statistics and recent activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{card.icon}</div>
                <div className={`px-2 py-1 rounded text-xs font-semibold bg-${card.color}-100 text-${card.color}-700`}>
                  {card.color}
                </div>
              </div>
              <h3 className="text-sm font-medium text-neutral-500 mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{card.value}</p>
              <p className="text-xs text-neutral-500">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900">Recent Users</h2>
            <p className="text-sm text-neutral-600">Latest registered users</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {stats.recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {(user.firstName?.[0] ?? user.username?.[0] ?? '?').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.username}
                          </div>
                          <div className="text-sm text-neutral-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {stats.recentUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No users registered yet</p>
            </div>
          )}
        </motion.div>

        {/* User Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-md border border-neutral-200 p-6"
        >
          <h2 className="text-xl font-bold text-neutral-900 mb-4">User Status Distribution</h2>
          <div className="space-y-4">
            {/* Active Users Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">Active Users</span>
                <span className="text-sm font-medium text-neutral-700">
                  {stats.activeUsers} ({stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.totalUsers > 0 ? (stats.activeUsers / stats.totalUsers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Inactive Users Bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">Inactive Users</span>
                <span className="text-sm font-medium text-neutral-700">
                  {stats.inactiveUsers} ({stats.totalUsers > 0 ? Math.round((stats.inactiveUsers / stats.totalUsers) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.totalUsers > 0 ? (stats.inactiveUsers / stats.totalUsers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
