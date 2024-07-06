import Layout from './Layout';
import ErrorPage from './ErrorPage';
import Register from './Register';
import Login from './Login';
import ArticleDetail from './ArticleDetail';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/articles/:id',
    element: <Layout />,
  },
];

export default routes;
