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
    <div className='border-x mx-auto w-1/3'>
      <h1 className='bg-orange-500 rounded-t py-4 text-5xl text-center'>Login!</h1>
      <form className='px-7 py-11 relative' onSubmit={handleLogin} method='post'>
        {error && (
          <div className='text-rose-600 absolute left-44 top-2 inset-x-0'>{error}!</div>
        )}
        <div className='flex justify-between items-baseline mb-8'>
          <label className='text-2xl font-bold' htmlFor='username'>
            Username:
          </label>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='text'
            name='username'
            id='username'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-8'>
          <label className='text-2xl font-bold' htmlFor='password'>
            Password:
          </label>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='password'
            name='password'
            id='password'
            required
          />
        </div>

        <div className='text-center'>
          <button className='bg-orange-500 rounded px-5 py-2 font-bold' type='submit'>
            Log In
          </button>
        </div>
      </form>

      <p className='bg-orange-500 rounded-b text-center'>
        Don&apos;t have an account,{' '}
        <Link className='hover:underline text-violet-500' to='/register'>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
