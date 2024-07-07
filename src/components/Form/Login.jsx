import { useState } from 'react';
import URL from '../../utils/url';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useOutletContext();

  const handleLogin = (e) => {
    e.preventDefault();
    // Prevent Form submission
    const data = new FormData(e.target);
    fetch(URL + '/users/login', {
      // Sending data
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If errors
        if (data.error) setError(data.error.message);
        else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('admin', data.admin);
          setToken(localStorage.getItem('token'));
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // Reset errors
    e.target.reset();
  };

  if (token) return <Navigate to={'/'} />;

  return (
    <>
      <form className='login-form' onSubmit={handleLogin} method='post'>
        {error && <div className='error'>{error}</div>}
        <h3>Login!</h3>
        <div className='form-row'>
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' id='username' required />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' required />
        </div>

        <div className='form-button'>
          <button type='submit'>Log In</button>
        </div>
      </form>

      <div className='form-link'>
        Don&apos;t have an account, <Link to='/register'>Register</Link>
      </div>
    </>
  );
};

export default Login;
