import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import ClientsPage from '@/pages/clients';
import OrdersPage from '@/pages/orders';
import ServicesPage from '@/pages/services';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/clients" />,
      },
      {
        path: '/clients',
        element: <ClientsPage />,
      },
      {
        path: '/services',
        element: <ServicesPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
    ],
  },
]);
