import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { usePortalAuth } from '@/context/PortalAuthContext'

const RequirePortalAuth = () => {
  const { isAuthenticated, isLoading } = usePortalAuth()
  const loc = useLocation()
  
  if (isLoading) {
    return (
      <div className="py-20 text-center text-neutral-600">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4" />
        <p>Securing your session…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/client-portal" replace state={{ from: loc.pathname }} />
  }
  return <Outlet />
}

export default RequirePortalAuth
