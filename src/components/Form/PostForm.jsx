import { useEffect, useRef } from 'react';
import URL from '../../utils/url';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostForm = ({ setPost, setUpdateForm, tokenFromUpdate, post }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [token] = useOutletContext();

  useEffect(() => {
    if (post) {
      formRef.current.querySelector('#title').value = post.title;
      formRef.current.querySelector('#body').value = post.body;
    }
  }, [post]);

  const handleSubmit = (e) => {
    // Prevent Form submission
    e.preventDefault();

    const data = new FormData(e.target);
    fetch(URL + '/posts' + (post ? `/${post._id}` : ''), {
      // Sending data
      method: post ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${!token ? tokenFromUpdate : token}`,
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
          .querySelectorAll('label + div')
          .forEach((div) => (div.textContent = ''));
        // Check for errors
        if (data.errors) {
          data.errors.forEach((error) => {
            const errorInput = formRef.current.querySelector(
              `label[for=${error.path}] + div`
            );
            errorInput.textContent = error.msg;
          });
          Object.keys(data.post).forEach((val) => {
            formRef.current.querySelector(`#${val}`).value = data.post[val];
          });
        } else {
          // No errors user created
          if (post) {
            setUpdateForm(false);
            setPost(data.post);
          } else {
            navigate('/posts/' + data.post._id);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // Reset Form
    e.target.reset();
  };

  if (!token || localStorage.getItem('admin') === 'false') return <Navigate to={'/'} />;

  return (
    <>
      <form className='register-form' ref={formRef} onSubmit={handleSubmit} method='post'>
        <h3>Create Post</h3>
        <div>
          <label htmlFor='title'>Title:</label>
          <div></div>
          <input type='text' name='title' id='title' required />
        </div>
        <div>
          <label htmlFor='body'>Body:</label>
          <div></div>
          <textarea name='body' id='body' required></textarea>
        </div>

        <div>
          <button type='submit'>{post ? 'Update' : 'Create'}</button>
          {post && <button onClick={() => setUpdateForm(false)}>Cancel</button>}
        </div>
      </form>
    </>
  );
};

PostForm.propTypes = {
  setPost: PropTypes.func,
  setUpdateForm: PropTypes.func,
  tokenFromUpdate: PropTypes.string,
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default PostForm;
