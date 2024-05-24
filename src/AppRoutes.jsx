import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import PageNotFound from './pages/PageNotFound';
import FinancialPage from './pages/financialPage';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';
import HomePage from './pages/HomePage';
import ProtectedRoute from './Auth/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/financial',
    element: (
      <ProtectedRoute>
        <Layout>
          <FinancialPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;
