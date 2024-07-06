import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Edit() {
  const [errors, setErrors] = useState([]);

  const location = useLocation();
  const { article } = location.state;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: article.title,
      text: article.text,
    },
    article,
  });

  console.log(article);

  const updateArticle = async (payload) => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('text', payload.text);
    formData.append('image', payload.image.length === 0 ? article.image : payload.image[0]);
    formData.append('user', localStorage.getItem('userID'));

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/articles/${article._id}/update`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      window.location.href = '/';
    }
  };

  return (
    <form className="edit_form" onSubmit={handleSubmit(updateArticle)}>
      <h2>Edit changes on the article:</h2>
      <label htmlFor="title">
        Title:
        <input type="text" {...register('title', { required: true })} />
      </label>

      <label htmlFor="text">
        Text:
        <textarea rows={8} {...register('text', { required: true })} />
      </label>

      <label htmlFor="image">
        Image:
        <input type="file" {...register('image')} />
      </label>

      <button type="submit">Save</button>
    </form>

  );
}
