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
          .querySelectorAll('.field-error')
          .forEach((span) => (span.textContent = ''));
        // Check for errors
        if (data.errors) {
          data.errors.forEach((error) => {
            const errorInput = formRef.current.querySelector(
              `label[for=${error.path}] + .field-error`
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
    <>
      <form
        className='register-form'
        ref={formRef}
        onSubmit={handleRegister}
        method='post'
      >
        <h3>Sign Up!</h3>
        <div className='form-row'>
          <label htmlFor='firstname'>First name:</label>
          <span className='field-error'></span>
          <input type='text' name='firstname' id='firstname' required />
        </div>
        <div className='form-row'>
          <label htmlFor='lastname'>Last name:</label>
          <span className='field-error'></span>
          <input type='text' name='lastname' id='lastname' required />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <span className='field-error'></span>
          <input type='email' name='email' id='email' required />
        </div>
        <div className='form-row'>
          <label htmlFor='username'>Username:</label>
          <span className='field-error'></span>
          <input type='text' name='username' id='username' required />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <span className='field-error'></span>
          <input type='password' name='password' id='password' required />
        </div>
        <div className='form-row'>
          <label htmlFor='cpassword'>Confirm Password:</label>
          <span className='field-error'></span>
          <input type='password' name='cpassword' id='cpassword' required />
        </div>

        <div className='form-button'>
          <button type='submit'>Register</button>
        </div>
      </form>

      <div className='form-link'>
        Already have an account, <Link to='/login'>Login</Link>
      </div>
    </>
  );
};

export default Register;
