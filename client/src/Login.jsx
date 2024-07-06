import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './login.css';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function sendData(payload) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
      return;
    }
    setErrors(response.message);
  }

  return (
    <div className="login">
      <div className="login_form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit(sendData)}>

          <label htmlFor="email">
            Email:
            <input type="email" placeholder="john.doe@gmail.com" {...register('email', { required: true })} />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" placeholder="Top Secret Password" {...register('password', { required: true })} />
          </label>

          {errors && errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}

          <button type="submit">
            Log in
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Sign up</Link>
        </p>
      </div>

      <div className="login_view">
        <ul>
          <h1>
            Get Access
            <br />
            To All the Blog Posts
          </h1>
          <li>Comment...</li>
          <li>Like...</li>
          <li>And create your own blog posts.</li>
        </ul>
      </div>
    </div>

  );
}
