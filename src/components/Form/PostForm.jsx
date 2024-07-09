import { useEffect, useRef } from 'react';
import URL from '../../utils/url';
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';

const PostForm = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [token] = useOutletContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(URL + '/posts/' + id, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          formRef.current.querySelector('#title').value = data.post.title;
          formRef.current.querySelector('#body').value = data.post.body;
        });
    }
  }, [id, token]);

  const handleSubmit = (e) => {
    // Prevent Form submission
    e.preventDefault();

    const data = new FormData(e.target);
    fetch(URL + '/posts' + (id ? `/${id}` : ''), {
      // Sending data
      method: id ? 'PUT' : 'POST',
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
          navigate('/posts/' + data.post._id);
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
          <button type='submit'>{id ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </>
  );
};
export default PostForm;
