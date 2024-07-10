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
    <div className='border-x mx-auto w-2/4 mb-9'>
      <h1 className='bg-orange-500 rounded-t py-4 text-5xl text-center'>Sign Up!</h1>
      <form className='px-7 py-11' ref={formRef} onSubmit={handleRegister} method='post'>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold relative' htmlFor='firstname'>
            First name:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='text'
            name='firstname'
            id='firstname'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold' htmlFor='lastname'>
            Last name:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='text'
            name='lastname'
            id='lastname'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold' htmlFor='email'>
            Email:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='email'
            name='email'
            id='email'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold' htmlFor='username'>
            Username:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='text'
            name='username'
            id='username'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold' htmlFor='password'>
            Password:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='password'
            name='password'
            id='password'
            required
          />
        </div>
        <div className='flex justify-between items-baseline mb-10 relative'>
          <label className='text-2xl font-bold' htmlFor='cpassword'>
            Confirm Password:
          </label>
          <div className='text-rose-600 absolute left-1/3 -top-8 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-2/3 rounded-sm px-2 py-1 text-2xl'
            type='password'
            name='cpassword'
            id='cpassword'
            required
          />
        </div>

        <div className='text-center'>
          <button
            className='bg-blue-500 text-black-500 active:bg-orange-500 px-5 py-2 font-bold rounded'
            type='submit'
          >
            Register
          </button>
        </div>
      </form>

      <p className='bg-orange-500 rounded-b text-center'>
        Already have an account,{' '}
        <Link className='hover:underline text-violet-500' to='/login'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
