import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { useForm } from 'react-hook-form';
import './articledetail.css';

export default function ArticleDetail() {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit } = useForm();
  const [logged, setLogged] = useState(false);
  const location = useLocation();
  const { article } = location.state;

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${article._id}`)
      .then((response) => response.json())
      .then((data) => setComments(data.comments));

    if (localStorage.getItem('accessToken')) {
      fetch('http://localhost:3000/users/protected', {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
        .then((response) => response.json())
        .then((data) => setLogged(data.success));
    }
  }, [article._id]);

  async function createComment(payload) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/comments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, article: article._id, user: JSON.parse(localStorage.getItem('user')).id }),
    });
    const data = await response.json();

    if (data.success) {
      if (!comments) {
        setComments([{ ...data.comment, user: JSON.parse(localStorage.getItem('user')) }]);
      } else {
        setComments([{ ...data.comment, user: JSON.parse(localStorage.getItem('user')) }, ...comments]);
      }
      return;
    }
    setErrors(response.message);
  }

  return (
    <div className="main">
      <div className="article_detail">
        <h1>{article.title}</h1>
        <p>
          By
          {' '}
          {article.user.first_name}
          {' '}
          {article.user.last_name}
        </p>
        <img src={article.image} alt="" />

        <Markdown style={{ whiteSpace: 'pre-wrap', borderBottom: '2px solid #333333', paddingBottom: '16px' }}>{article.text.replace('&#x27;', "'")}</Markdown>
        {/* <p style={{ whiteSpace: 'pre-wrap' }}>{article.text}</p> */}
        <div className="comment_list">
          <h2>Comment section</h2>
          {
            logged ? (
              <form onSubmit={handleSubmit(createComment)}>
                <label htmlFor="comment">
                  Comment:
                  <textarea rows={4} {...register('comment', { required: true })} />
                </label>
                <button type="submit">Send</button>
              </form>
            ) : <p style={{ marginBottom: '20px' }}>You need to login to comment!</p>
          }
          {comments && comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <p className="username">{`@${comment.user.first_name}.${comment.user.last_name}`}</p>
              <p className="user_comment">{comment.comment}</p>
              <p className="date">{new Date(comment.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
