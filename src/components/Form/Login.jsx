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
    <div className='bg-blue-ribbon-100 w-10/12 p-3 md:w-7/12 lg:w-5/12 xl:w-4/12 rounded-md mx-auto m-2'>
      <h1 className='text-center text-xl mb-5'>Login</h1>
      <form className='w-full flex flex-col gap-3' onSubmit={handleLogin} method='post'>
        {error && <div className='text-rose-500 mx-auto'>{error}!</div>}
        <div className='flex justify-between items-center w-11/12 mx-auto'>
          <label className='font-bold' htmlFor='username'>
            Username:
          </label>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            name='username'
            id='username'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto'>
          <label className='font-bold' htmlFor='password'>
            Password:
          </label>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='password'
            name='password'
            id='password'
            required
          />
        </div>

        <div className='self-center'>
          <button
            className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors mb-4'
            type='submit'
          >
            Log In
          </button>
        </div>
      </form>

      <p className='text-black-500 tracking-wide flex justify-end'>
        Don&apos;t have an account,{' '}
        <Link
          className='text-black-700 underline underline-offset-4 hover:text-black-950 decoration-blue-ribbon-600 decoration-4 '
          to='/register'
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
