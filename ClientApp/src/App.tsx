import { RouterProvider } from 'react-router-dom';
import { router } from '@/lib/router';

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
