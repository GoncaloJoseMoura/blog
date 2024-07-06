import Layout from './Layout';
import ErrorPage from './ErrorPage';
import ArticleDetail from './ArticleDetail';
import Edit from './Edit';
import ArticleCreate from './ArticleCreate';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/articles/create',
    element: <ArticleCreate />,
  },
  {
    path: '/articles/:id',
    element: <ArticleDetail />,
  },
  {
    path: '/articles/:id/edit',
    element: <Edit />,
  },
];

export default routes;
