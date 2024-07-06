import { Link, useNavigate } from 'react-router-dom';
import './header.css';

export default function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('accessToken');
    navigate('/');
  }

  return (
    <div className="header">
      <Link to="/" className="logo">
        <img src="../public/logo.svg" alt="Blog log" />
        <h1>CRUD & COFFEE</h1>
      </Link>
      {
          localStorage.getItem('accessToken') ? <button type="button" className="loginButton" onClick={logout}> Log out </button> : <Link className="loginButton" to="/login"> Log in</Link>
      }
    </div>

  );
}
