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
        className='bg-slate-300 my-4 py-8 px-7 rounded-md flex flex-col gap-5'
        ref={formRef}
        onSubmit={handleSubmit}
        method='post'
      >
        <div className='flex relative'>
          <label className='text-2xl mr-2 self-center' htmlFor='text'>
            Comment:{' '}
          </label>
          <div className='text-rose-600 absolute left-28 -top-6 inset-x-0'></div>
          <input
            className='bg-slate-200 border border-orange-500 outline-none w-2/5 rounded-sm px-3 py-1 text-2xl'
            type='text'
            id='text'
            name='text'
          />
        </div>
        <div className='flex justify-start gap-2'>
          <button className='bg-blue-500 px-3 py-1 rounded-md' type='submit'>
            {comment ? 'Save' : 'Post'}
          </button>
          {comment && (
            <button
              className='bg-orange-500 px-3 py-1 rounded-md'
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
