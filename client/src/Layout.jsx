import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Articles from './Articles';
import ArticleDetail from './ArticleDetail';

export default function Layout() {
  const [auth, setAuth] = useState(false);
  const { id } = useParams();

  useEffect(
    () => {
      async function fetchData() {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/protected`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        const data = await response.json();
        setAuth(data.success);
      }
      fetchData();
    },
    [],
  );

  return (
    <>
      <Header />
      {id ? <ArticleDetail /> : <Articles /> }
      <Footer />

    </>
  );
}
