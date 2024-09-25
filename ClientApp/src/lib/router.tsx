import { createBrowserRouter } from 'react-router-dom';
import ClientsPage from '@/pages/clients';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientsPage />,
  },
]);
