import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  async function sendData(payload) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', data.user);
      localStorage.setItem('accessToken', data.accessToken);
      window.location.reload();
      return;
    }
    setErrors(response.message);
  }

  return (
    <div className="login">
      <div className="login_form">
        <h2>Login Form</h2>

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

      </div>
      <div className="login_view">
        <ul>
          <h1>
            Get Access
            <br />
            To All the Blog Posts
          </h1>
          <li>Create...</li>
          <li>Edit...</li>
          <li>And Delete them.</li>
        </ul>
      </div>
    </div>

  );
}
