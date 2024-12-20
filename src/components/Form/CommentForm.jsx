import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import URL from '../../utils/url';

const CommentForm = ({ comment, postId, setUpdateform, updateComments, token }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (comment) {
      formRef.current.querySelector('#text').value = comment.text;
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(URL + '/posts/' + postId + '/comments' + (comment ? `/${comment._id}` : ''), {
      method: comment ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: data.get('text'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        formRef.current.querySelector(`label[for='text'] + div`).textContent = '';

        if (data.errors) {
          formRef.current.querySelector(`label[for='text'] + div`).textContent =
            data.errors[0].msg;
          formRef.current.querySelector(`#text`).value = data.comment.text;
        } else {
          if (comment) {
            setUpdateform(false);
          }
          updateComments(data.comment, 'update');
        }
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  return (
    <>
      <form
        className='max-w-screen-sm px-2 py-1 mx-auto'
        ref={formRef}
        onSubmit={handleSubmit}
        method='post'
      >
        <div className='flex items-center'>
          <label className='mr-2 font-bold' htmlFor='text'>
            Comment:{' '}
          </label>
          <div className=''></div>
          <input
            className='px-3 py-2 w-full rounded-md border-2 border-black-100 focus-within:outline-black-500'
            type='text'
            id='text'
            name='text'
          />
        </div>
        <div className='flex mt-2 gap-5 justify-end mr-1'>
          <button
            className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors'
            type='submit'
          >
            {comment ? 'Save' : 'Post'}
          </button>
          {comment && (
            <button
              className='text-solid-pink-500 hover:underline'
              onClick={() => setUpdateform(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.shape({
    author: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  setUpdateform: PropTypes.func,
  token: PropTypes.string,
  updateComments: PropTypes.func,
};

export default CommentForm;
