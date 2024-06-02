import { createBrowserRouter } from 'react-router-dom';
import FinancialPage from '@/pages/financialPage';
import LogIn from '@/pages/auth/LogIn';
import SignUp from '@/pages/auth/SignUp';
import ProtectedRoute from '@/auth/ProtectedRoute';
import ProfilePage from '@/pages/ProfilePage';
import Layout from '@/layout/Layout';
import PageNotFound from '@/pages/PageNotFound';
import HomePage from '@/pages/HomePage';

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
    element: (
      <Layout>
        <LogIn />,
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <SignUp />,
      </Layout>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;
