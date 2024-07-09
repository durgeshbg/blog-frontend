import { useState } from 'react';
import URL from '../../utils/url';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
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
        <h3>Login!</h3>
        {error && <div>{error}</div>}
        <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' id='username' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' required />
        </div>

        <div>
          <button type='submit'>Log In</button>
        </div>
      </form>

      <div>
        Don&apos;t have an account, <Link to='/register'>Register</Link>
      </div>
    </>
  );
};

export default Login;
