import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import ClientsPage from '@/pages/clients';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <App />,
    children: [
      {
        id: 'main',
        path: '/',
        element: <Navigate to="/clients" />,
      },
      {
        id: 'clients',
        path: '/clients',
        element: <ClientsPage />,
      },
    ],
  },
]);
