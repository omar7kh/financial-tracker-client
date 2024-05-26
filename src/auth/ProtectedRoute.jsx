import { useCheckAuth } from '@/api/checkAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoading } = useCheckAuth();

  if (isLoading) return;

  if (isAuth) return children;

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
