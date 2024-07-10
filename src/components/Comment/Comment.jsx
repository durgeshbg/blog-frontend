import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import URL from '../../utils/url';
import { useState } from 'react';
import CommentForm from '../Form/CommentForm';

const Comment = ({ comment, token, updateComments, postId }) => {
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
          postId={postId}
        />
      ) : (
        <div className='bg-slate-300 mb-5 px-7 py-4 rounded-md'>
          <p className='text-2xl'>{comment.text}</p>
          <p className='italic font-bold'>@{comment.username}</p>
          <p className='text-orange-500'>{distance(new Date(comment.updatedAt))}</p>
          {comment.author && (
            <div className='flex gap-2'>
              <button className='bg-rose-500 px-3 py-1 rounded-md' onClick={handleDelete}>
                Delete
              </button>
              <button className='bg-blue-500 px-3 py-1 rounded-md' onClick={() => setUpdateform(true)}>Update</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

Comment.propTypes = {
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
  token: PropTypes.string,
  updateComments: PropTypes.func,
};

export default Comment;
