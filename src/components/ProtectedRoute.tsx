// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { apiClient } from '../lib/api-client';
// O usa tu Custom Hook de estado de autenticación: const { isAuthenticated } = useAuth();

interface ProtectedRouteProps {
  type: 'public' | 'private';
}

export const ProtectedRoute = ({ type }: ProtectedRouteProps) => {
  const location = useLocation();

  // 1. Verificar si existe la sesión (Si la cookie no es HttpOnly)
  const token = false;

  // 2. Si no hay token y quiere entrar a una ruta privada -> Redirigir a /auth
  if (!token && type === 'private') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. Si hay token y quiere entrar a una ruta pública (/auth, /sign-in) -> Redirigir a /home
  if (token && type === 'public') {
    return <Navigate to="/home" replace />;
  }

  // 4. Si cumple las condiciones, renderiza la ruta hija
  return <Outlet />;
};