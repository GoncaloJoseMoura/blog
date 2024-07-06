import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div
      className="header"
    >
      <Link
        to="/"
        style={{
          color: '#ffffff', textDecoration: 'none', fontSize: '26px', fontWeight: '600',
        }}
      >
        All Posts
      </Link>
    </div>

  );
}
