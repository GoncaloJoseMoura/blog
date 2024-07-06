import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './register.css';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function sendData(payload) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('userID', data.user._id);
      navigate('/login');
      return;
    }
    setErrors(response.message);
  }

  return (
    <div className="register">
      <div>
        <h2>Create your account</h2>

        <form className="register_form" onSubmit={handleSubmit(sendData)}>

          <label htmlFor="first_name">
            First name:
            <input type="text" placeholder="John" {...register('first_name', { required: true })} />
          </label>

          <label htmlFor="last_name">
            Last name:
            <input type="text" placeholder="Doe" {...register('last_name', { required: true })} />
          </label>

          <label htmlFor="email">
            Email:
            <input type="email" placeholder="john.doe@gmail.com" {...register('email', { required: true })} />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" placeholder="Top Secret Password" {...register('password', { required: true })} />
          </label>

          <label htmlFor="c_password">
            Confirm password:
            <input type="password" placeholder="Top Secret Password" {...register('c_password', { required: true })} />
          </label>

          {errors && errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}

          <button type="submit">
            Sign up
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
      <div className="register_view">
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
