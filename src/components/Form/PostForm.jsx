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
    <div className='mx-auto bg-blue-ribbon-200 flex flex-col items-center gap-5 p-4 m-3 rounded-md md:w-10/12 lg:w-8/12 xl:w-6/12'>
      <h1 className='text-xl'>{post ? 'Update' : 'Create'} Post</h1>
      <form
        className='flex flex-col w-full gap-5'
        ref={formRef}
        onSubmit={handleSubmit}
        method='post'
      >
        <div className='w-full relative'>
          <label className='font-bold' htmlFor='title'>
            Title:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <input
            className='px-3 py-2 w-full rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            name='title'
            id='title'
          />
        </div>
        <div className='w-full relative'>
          <label className='font-bold' htmlFor='body'>
            Body:
          </label>
          <div className='text-rose-500 absolute -top-4 right-0 text-sm'></div>
          <textarea
            className='px-3 py-2 w-full rounded-md border-2 border-black-100 focus-within:outline-black-500'
            name='body'
            id='body'
            rows={10}
          ></textarea>
        </div>

        <div className='self-center flex items-baseline gap-5'>
          <button
            className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors mb-4'
            type='submit'
          >
            {post ? 'Update' : 'Create'}
          </button>
          {post && (
            <button
              className='text-solid-pink-500 px-2 md:px-4 md:py-2 hover:underline'
              onClick={() => setUpdateForm(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
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
