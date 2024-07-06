import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ArticleList() {
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

  console.log(articles);

  return (
    <div className="article">
      <h2>Blog Posts</h2>
      <Link to="/articles/create" className="create">Create Article</Link>
      <div className="article_list">

        {articles.map((article) => (
          <div key={article._id} className="article_item">
            <Link to={`articles/${article._id}`} state={{ article }}>
              <img src={article.image} alt="Nothing to show yet" />
              <h3>{article.title}</h3>
            </Link>
          </div>
        )) }

      </div>
    </div>
  );
}
