import { useState } from 'react';
import URL from '../../url';
import { Link } from 'react-router-dom';
const Login = () => {
  const [error, setError] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    fetch(URL + '/users/login', {
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
        if (data.error) setError(data.error.message);
        else localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        console.error(err);
      });

    e.target.reset();
  };
  return (
    <>
      <form onSubmit={handleLogin} method='post'>
        {error && <div>{error}</div>}
        <div className='form-row'>
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' id='username' required />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' required />
        </div>

        <div className='form-row'>
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
