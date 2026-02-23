import { Outlet, NavLink } from 'react-router-dom'
import { usePortalAuth } from '@/context/PortalAuthContext'
import ErrorMessage from '@/components/common/ErrorMessage'

const linkBase = 'px-4 py-2 rounded-md text-sm font-medium transition-colors'

const navItems = [
  { to: '/client-portal/admin/dashboard', label: 'Dashboard' },
  { to: '/client-portal/admin/clients', label: 'Clients' },
  { to: '/client-portal/admin/users', label: 'All Users' },
  { to: '/client-portal/admin/invoices', label: 'Invoices' },
]

const AdminLayout = () => {
  const { user } = usePortalAuth()
  const isAdmin = user?.role === 'admin'

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message="Admin privileges required to access this area." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Admin Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Admin Portal</h2>
            <p className="text-sm text-neutral-600">Manage users and view system statistics</p>
          </div>
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
            Administrator
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin Content */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout