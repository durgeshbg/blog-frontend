import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import './Comment.css';
import URL from '../../utils/url';
import { useState } from 'react';
import CommentForm from '../Form/CommentForm';

const Comment = ({ comment, token, updateComments }) => {
  const [updateform, setUpdateform] = useState(false);

  const handleDelete = () => {
    if (token) {
      fetch(URL + '/posts/' + comment.post + '/comments/' + comment._id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => updateComments(data.comment, 'delete'));
    }
  };
  return (
    <>
      {updateform ? (
        <CommentForm
          comment={comment}
          token={token}
          updateComments={updateComments}
          setUpdateform={setUpdateform}
        />
      ) : (
        <div className='comment'>
          <div className='text'>{comment.text}</div>
          <div className='username'>@{comment.username}</div>
          <div className='time'>{distance(new Date(comment.updatedAt))}</div>
          {comment.author && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setUpdateform(true)}>Update</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  token: PropTypes.string,
  updateComments: PropTypes.func,
};

export default Comment;
