import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import Layout from './components/Layout';

const router = createBrowserRouter([
{
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: '/admin',
      element: <AdminPage />,
    },
  ],
}
]);

export function Router() {
  return <RouterProvider router={router} />;
}
