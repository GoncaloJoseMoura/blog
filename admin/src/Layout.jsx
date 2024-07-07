import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import ArticleList from './ArticleList';

export default function Layout() {
  const [auth, setAuth] = useState(false);

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

  console.log(auth);

  return (
    <>

      {auth ? (
        <div className="main_page">
          {/* <Header /> */}
          <ArticleList />
          <Footer />
        </div>
      ) : (
        <Login />)}

    </>
  );
}
