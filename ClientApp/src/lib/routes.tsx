import { Navigate } from 'react-router-dom';
import { paths } from './paths';

import App from '@/App';
import ClientsPage from '@/pages/clients';
import OrdersPage from '@/pages/orders';
import ServicesPage from '@/pages/services';

export const routes = [
  {
    path: paths.main,
    element: <App />,
    children: [
      { path: paths.main, element: <Navigate to={paths.clients} /> },
      { path: paths.clients, element: <ClientsPage /> },
      { path: paths.services, element: <ServicesPage /> },
      { path: paths.orders, element: <OrdersPage /> },
    ],
  },
];
