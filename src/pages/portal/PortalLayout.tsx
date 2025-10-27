import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { usePortalAuth } from '@/context/PortalAuthContext'

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'

const PortalLayout = () => {
  const { user, logout } = usePortalAuth()
  const isAdmin = user?.role === 'admin'
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <div>
              <h1 className="text-xl font-semibold text-neutral-900">Client Portal</h1>
              <p className="text-sm text-neutral-500">Welcome back, {user?.name || 'Client'}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  logout()
                  navigate('/client-portal')
                }}
                className="text-sm text-neutral-600 hover:text-primary-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="grid lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-neutral-200 p-4">
              <nav className="grid gap-1">
                <NavLink to="/client-portal/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Dashboard</NavLink>
                <NavLink to="/client-portal/documents" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Documents</NavLink>
                <NavLink to="/client-portal/messages" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Messages</NavLink>
                <NavLink to="/client-portal/appointments" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Appointments</NavLink>
                <NavLink to="/client-portal/billing" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Billing</NavLink>
                <NavLink to="/client-portal/settings" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Settings</NavLink>
                {isAdmin && (
                  <NavLink to="/client-portal/admin" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'}`}>Admin</NavLink>
                )}
              </nav>
            </aside>

            {/* Content */}
            <main className="lg:col-span-9 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortalLayout
