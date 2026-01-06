import { motion } from 'framer-motion'
import { RecentUser } from '@/services/api'

interface RecentUsersTableProps {
  users: RecentUser[]
}

const RecentUsersTable = ({ users }: RecentUsersTableProps) => {
  return (
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
            {users.map((user) => (
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
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No users registered yet</p>
        </div>
      )}
    </motion.div>
  )
}

export default RecentUsersTable