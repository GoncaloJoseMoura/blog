import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './articles.css';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/articles/')
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="article">
      <h2>Most Recent Posts</h2>
      <div className="article_list">
        {articles.map((article) => (
          <div key={article._id} className="article_item">
            <Link to={`articles/${article._id}`} state={{ article }}>
              <img src={article.image} alt="Nothing to show yet" />
              <p>{article.title}</p>
            </Link>
          </div>
        )) }
      </div>
    </div>
  );
}
