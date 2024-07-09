import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import URL from '../../utils/url';

const CommentForm = ({ comment, setUpdateform, updateComments, token }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (comment) {
      formRef.current.querySelector('#text').value = comment.text;
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(URL + '/posts/' + comment.post + '/comments/' + comment._id, {
      method: 'PUT',
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
        formRef.current.querySelector(`label[for='text'] + span`).textContent = '';

        if (data.errors) {
          formRef.current.querySelector(`label[for='text'] + span`).textContent =
            data.errors[0].msg;
          formRef.current.querySelector(`#text`).textContent = data.comment.text;
        } else {
          updateComments(data.comment, 'update');
          setUpdateform(false);
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
          <span></span>
          <input type='text' id='text' name='text' />
        </div>
        <button type='submit'>Save</button>
      </form>
    </>
  );
};

CommentForm.propTypes = {
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
