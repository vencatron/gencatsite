import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService, AdminStats } from '@/services/api'
import { usePortalAuth } from '@/context/PortalAuthContext'
import { StatCard } from '@/components/admin/StatCard'
import RecentUsersTable from '@/components/admin/RecentUsersTable'
import UserDistributionChart from '@/components/admin/UserDistributionChart'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import Loading from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMessage'

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
        <ErrorMessage message="Admin privileges required to view this page." />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading message="Loading dashboard..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage message={error} onRetry={loadStats} />
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
        <AdminPageHeader 
          title="Admin Dashboard" 
          description="Overview of system statistics and recent activity" 
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle={`${stats.activeUsers} active · ${stats.inactiveUsers} inactive`}
            color="blue"
            iconKey="Users"
          />
          <StatCard
            title="Documents"
            value={stats.totalDocuments}
            subtitle="Total uploaded files"
            color="purple"
            iconKey="Document"
          />
          <StatCard
            title="Messages"
            value={stats.totalMessages}
            subtitle={`${stats.unreadMessages} unread messages`}
            color="orange"
            iconKey="Message"
          />
          <StatCard
            title="Invoices"
            value={stats.totalInvoices}
            subtitle={`${stats.pendingInvoices} pending payment`}
            color="indigo"
            iconKey="Invoice"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            subtitle="Total lifetime revenue"
            color="green"
            iconKey="Revenue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentUsersTable users={stats.recentUsers} />
          <UserDistributionChart 
            activeUsers={stats.activeUsers} 
            inactiveUsers={stats.inactiveUsers} 
            totalUsers={stats.totalUsers} 
          />
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard