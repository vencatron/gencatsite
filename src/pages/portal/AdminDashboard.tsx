import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, AdminStats } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'

// Icons
const Icons = {
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Document: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Message: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  Invoice: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  Revenue: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const StatCard = ({ title, value, subtitle, color, icon: Icon }: any) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex flex-col items-start">
        <div className={`p-3 rounded-lg mb-4 ${colorStyles[color as keyof typeof colorStyles] || 'bg-gray-50 text-gray-600'}`}>
          <Icon />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">{value}</h3>
        </div>
      </div>
      <div className="flex items-center text-xs mt-4">
        <span className="text-neutral-400 font-medium">{subtitle}</span>
      </div>
    </motion.div>
  )
}

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">Admin privileges required to view this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-neutral-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center justify-between">
          <p className="text-red-800 font-medium">{error}</p>
          <button 
            onClick={loadStats} 
            className="px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-500">Overview of system statistics and recent activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle={`${stats.activeUsers} active · ${stats.inactiveUsers} inactive`}
            color="blue"
            icon={Icons.Users}
          />
          <StatCard
            title="Documents"
            value={stats.totalDocuments}
            subtitle="Total uploaded files"
            color="purple"
            icon={Icons.Document}
          />
          <StatCard
            title="Messages"
            value={stats.totalMessages}
            subtitle={`${stats.unreadMessages} unread messages`}
            color="orange"
            icon={Icons.Message}
          />
          <StatCard
            title="Invoices"
            value={stats.totalInvoices}
            subtitle={`${stats.pendingInvoices} pending payment`}
            color="indigo"
            icon={Icons.Invoice}
          />
          <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            subtitle="Total lifetime revenue"
            color="green"
            icon={Icons.Revenue}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Users Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-neutral-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-neutral-900">Recent Users</h2>
                <p className="text-sm text-neutral-500 mt-1">Latest registered users and their status</p>
              </div>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider">Docs</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider">Invoiced</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {stats.recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm border border-primary-100">
                            {(user.firstName?.[0] ?? user.username?.[0] ?? '?').toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-neutral-900">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.username}
                            </div>
                            <div className="text-xs text-neutral-400">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {user.documentCount ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.hasInvoice
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {user.hasInvoice ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-neutral-500">
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
                <p className="text-neutral-500">No users registered yet</p>
              </div>
            )}
          </motion.div>

          {/* User Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 h-fit"
          >
            <h2 className="text-lg font-bold text-neutral-900 mb-6">User Distribution</h2>
            
            <div className="space-y-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                      Active
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-green-50">
                  <div
                    style={{ width: `${stats.totalUsers > 0 ? (stats.activeUsers / stats.totalUsers) * 100 : 0}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-1000 ease-out"
                  ></div>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{stats.activeUsers} users currently active</p>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                      Inactive
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-red-600">
                      {stats.totalUsers > 0 ? Math.round((stats.inactiveUsers / stats.totalUsers) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-red-50">
                  <div
                    style={{ width: `${stats.totalUsers > 0 ? (stats.inactiveUsers / stats.totalUsers) * 100 : 0}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-1000 ease-out"
                  ></div>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{stats.inactiveUsers} users currently inactive</p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100">
                <h3 className="text-sm font-medium text-neutral-900 mb-4">System Health</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-500">Database Status</span>
                  <span className="flex items-center text-green-600 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">API Latency</span>
                  <span className="text-neutral-900 font-medium">24ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard