import { useLocation, Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export default function ArticleDetail() {
  const location = useLocation();
  const { article } = location.state;

  console.log(article.text);

  const onclick = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/articles/${article._id}/delete`, {
      method: 'DELETE',
    });

    window.location.href = '/';
  };

  return (
    <div className="main">
      <div />
      <div className="article_detail">
        <Link className="edit" to={`/articles/${article._id}/edit`} state={{ article }}>Edit</Link>
        <button className="delete" type="button" onClick={onclick}>Delete</button>
        <h1>{article.title}</h1>
        <p>
          By
          {' '}
          {article.user.first_name}
          {' '}
          {article.user.last_name}
        </p>
        <img src={article.image} alt="" />

        <Markdown style={{ whiteSpace: 'pre-wrap' }}>{article.text.replace('&#x27;', "'")}</Markdown>
        {/* <p style={{ whiteSpace: 'pre-wrap' }}>{article.text}</p> */}
      </div>
      <div />
    </div>
  );
}
