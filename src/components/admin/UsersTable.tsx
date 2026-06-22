import { User } from '@/services/api'

interface UsersTableProps {
  users: User[]
  currentUser: { id: string | number } | null
  onRoleChange: (user: User, role: 'admin' | 'client') => void
  onDelete: (user: User) => void
  onActivate: (user: User) => void
  onResetPassword: (user: User) => void
  actionLoading: boolean
}

const UsersTable = ({
  users,
  currentUser,
  onRoleChange,
  onDelete,
  onActivate,
  onResetPassword,
  actionLoading
}: UsersTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                Docs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Invoiced
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {users.map((user) => (
              <tr key={user.id} className={!user.isActive ? 'bg-neutral-50 opacity-60' : ''}>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{user.documentCount ?? 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.hasInvoice
                      ? 'bg-green-100 text-green-800'
                      : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {user.hasInvoice ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end flex-wrap gap-2">
                    {String(user.id) === String(currentUser?.id) && (
                      <span className="text-neutral-400">Current User</span>
                    )}
                    {String(user.id) !== String(currentUser?.id) && (
                      <>
                        <button
                          onClick={() =>
                            onRoleChange(user, user.role === 'admin' ? 'client' : 'admin')
                          }
                          disabled={actionLoading}
                          className={`${
                            user.role === 'admin'
                              ? 'text-neutral-600 hover:text-neutral-900'
                              : 'text-purple-600 hover:text-purple-800'
                          } disabled:opacity-50`}
                        >
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        {user.role !== 'admin' && (
                          <>
                            <button
                              onClick={() => onResetPassword(user)}
                              disabled={actionLoading}
                              className="text-primary-600 hover:text-primary-900 disabled:opacity-50"
                            >
                              Reset Password
                            </button>
                            {user.isActive ? (
                              <button
                                onClick={() => onDelete(user)}
                                disabled={actionLoading}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => onActivate(user)}
                                disabled={actionLoading}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              >
                                Activate
                              </button>
                            )}
                          </>
                        )}
                        {user.role === 'admin' && (
                          <span className="text-neutral-400">Admin</span>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600">No users found</p>
        </div>
      )}
    </div>
  )
}

export default UsersTable