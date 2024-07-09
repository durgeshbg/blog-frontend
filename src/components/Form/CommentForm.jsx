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
      <form ref={formRef} onSubmit={handleSubmit} method='post'>
        <div>
          <label htmlFor='text'>Comment: </label>
          <div></div>
          <input type='text' id='text' name='text' required />
        </div>
        <button type='submit'>{comment ? 'Save' : 'Post'}</button>
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
