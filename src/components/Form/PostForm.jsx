import { useRef } from 'react';
import URL from '../../utils/url';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostForm = ({ token }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  if (!token || localStorage.getItem('admin') === 'false')
    return <Navigate to={'/home'} />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    fetch(URL + '/posts', {
      // Sending data
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.get('title'),
        body: data.get('body'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Reset errors
        formRef.current
          .querySelectorAll('.field-error')
          .forEach((span) => (span.textContent = ''));
        if (data.errors) {
          data.errors.forEach((error) => {
            const errorInput = formRef.current.querySelector(
              `label[for=${error.path}] + .field-error`
            );
            errorInput.textContent = error.msg;
          });
          Object.keys(data.post).forEach((val) => {
            formRef.current.querySelector(`#${val}`).value = data.post[val];
          });
        } else {
          // No errors user created
          navigate('/home');
        }
      })
      .catch((err) => {
        console.error(err);
      });

    e.target.reset();
  };
  return (
    <>
      <form className='register-form' ref={formRef} onSubmit={handleSubmit} method='post'>
        <h3>Create Post</h3>
        <div className='form-row'>
          <label htmlFor='title'>Title:</label>
          <span className='field-error'></span>
          <input type='text' name='title' id='title' />
        </div>
        <div className='form-row'>
          <label htmlFor='body'>Body:</label>
          <span className='field-error'></span>
          <textarea name='body' id='body'></textarea>
        </div>

        <div className='form-button'>
          <button type='submit'>Create</button>
        </div>
      </form>
    </>
  );
};
PostForm.propTypes = {
  token: PropTypes.string,
};
export default PostForm;
