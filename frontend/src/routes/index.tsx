import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { PendenciesPanel } from '../pages/PendenciesPanel';
import { ClientsList } from '../features/clients/pages/ClientsList';
import { ProcessList } from '../features/processes/pages/ProcessList';
import { UsersPanel } from '../features/users/pages/UsersPanel';
import { Dashboard } from '../pages/Dashboard';
import { Reports } from '../pages/Reports';
import { LoginPage } from '../pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/relatorios',
            element: <Reports />,
          },
          {
            path: '/pendencias',
            element: <PendenciesPanel />,
          },
          {
            path: '/clientes',
            element: <ClientsList />,
          },
          {
            path: '/processos',
            element: <ProcessList />,
          },
          {
            path: '/equipe',
            element: <UsersPanel />,
          },
        ],
      },
    ],
  },
]);
