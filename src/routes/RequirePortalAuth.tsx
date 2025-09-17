import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { usePortalAuth } from '@/context/PortalAuthContext'

const RequirePortalAuth = () => {
  const { isAuthenticated } = usePortalAuth()
  const loc = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/client-portal" replace state={{ from: loc.pathname }} />
  }
  return <Outlet />
}

export default RequirePortalAuth

