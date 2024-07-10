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
    <div className='border-x mx-auto w-2/3'>
      <h1 className='bg-orange-500 rounded-t py-4 text-5xl text-center'>
        {post ? 'Update' : 'Create'} Post
      </h1>
      <form
        className='px-7 py-11 relative'
        ref={formRef}
        onSubmit={handleSubmit}
        method='post'
      >
        <div className='flex justify-between items-baseline mb-8 relative'>
          <label className='text-2xl font-bold' htmlFor='title'>
            Title:
          </label>
          <div className='text-rose-600 absolute text-center -top-7 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-5/6 rounded-sm px-2 py-1 text-2xl'
            type='text'
            name='title'
            id='title'
          />
        </div>
        <div className='flex justify-between items-baseline mb-8 relative'>
          <label className='text-2xl font-bold' htmlFor='body'>
            Body:
          </label>
          <div className='text-rose-600 absolute text-center -top-7 inset-x-0'></div>
          <textarea
            className='resize-y bg-slate-200 border border-green-500 invalid:border-rose-500 outline-none w-5/6 rounded-sm px-2 py-1 text-2xl'
            name='body'
            id='body'
            rows={10}
          ></textarea>
        </div>

        <div className='flex gap-2'>
          <button className='bg-blue-500 rounded px-5 py-2 font-bold' type='submit'>
            {post ? 'Update' : 'Create'}
          </button>
          {post && (
            <button
              className='bg-orange-500 rounded px-5 py-2 font-bold'
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
