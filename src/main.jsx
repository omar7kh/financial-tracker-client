import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import router from './utils/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position='bottom-right' />
    </QueryClientProvider>
  </ContextProvider>
);
