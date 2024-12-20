import { useRef } from 'react';
import URL from '../../utils/url';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
const Register = () => {
  const formRef = useRef(null);
  const [token, setToken] = useOutletContext();

  const handleRegister = (e) => {
    // Prevent Form submission
    e.preventDefault();

    const data = new FormData(e.target);
    fetch(URL + '/users/register', {
      // Sending data
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        email: data.get('email'),
        username: data.get('username'),
        password: data.get('password'),
        cpassword: data.get('cpassword'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Reset errors
        formRef.current
          .querySelectorAll('label + div')
          .forEach((span) => (span.textContent = ''));
        // Check for errors
        if (data.errors) {
          data.errors.forEach((error) => {
            const errorInput = formRef.current.querySelector(
              `label[for=${error.path}] + div`
            );
            errorInput.textContent = error.msg;
          });
          Object.keys(data.user).forEach((val) => {
            formRef.current.querySelector(`#${val}`).value = data.user[val];
          });
        } else {
          // No errors user created
          localStorage.setItem('token', data.token);
          localStorage.setItem('admin', data.admin);
          setToken(localStorage.getItem('token'));
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // Reset Form
    e.target.reset();
  };
  if (token) return <Navigate to={'/'} />;
  return (
    <div className='bg-blue-ribbon-100 w-10/12 p-3 md:w-7/12 lg:w-5/12 xl:w-4/12 rounded-md mx-auto m-2'>
      <h1 className='text-center text-xl mb-5'>Sign Up</h1>
      <form
        className='w-full flex flex-col gap-5'
        ref={formRef}
        onSubmit={handleRegister}
        method='post'
      >
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='firstname'>
            First name:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            name='firstname'
            id='firstname'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='lastname'>
            Last name:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            name='lastname'
            id='lastname'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='email'>
            Email:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='email'
            name='email'
            id='email'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='username'>
            Username:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            name='username'
            id='username'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='password'>
            Password:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='password'
            name='password'
            id='password'
            required
          />
        </div>
        <div className='flex justify-between items-center w-11/12 mx-auto relative'>
          <label className='font-bold' htmlFor='cpassword'>
            Confirm <br /> Password:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-8/12 rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='password'
            name='cpassword'
            id='cpassword'
            required
          />
        </div>

        <div className='self-center'>
          <button
            className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors mb-4'
            type='submit'
          >
            Register
          </button>
        </div>
      </form>

      <p className='text-black-500 tracking-wide flex justify-end'>
        Already have an account,{' '}
        <Link
          className='text-black-700 underline underline-offset-4 hover:text-black-950 decoration-blue-ribbon-600 decoration-4 '
          to='/login'
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
