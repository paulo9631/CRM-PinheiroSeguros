import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PendenciesPanel } from '../pages/PendenciesPanel';
import { ClientsList } from '../features/clients/pages/ClientsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/pendencias" replace />,
      },
      {
        path: '/pendencias',
        element: <PendenciesPanel />,
      },
      {
        path: '/clientes',
        element: <ClientsList />,
      },
    ],
  },
]);
