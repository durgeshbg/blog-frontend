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
    <div className='mb-3 mx-2 bg-blue-ribbon-100 p-5 max-w-1/4 md:w-8/12 md:mx-auto rounded-sm'>
      {updateform ? (
        <CommentForm
          comment={comment}
          token={token}
          updateComments={updateComments}
          setUpdateform={setUpdateform}
          postId={postId}
        />
      ) : (
        <>
          <p className='mb-2 md:text-xl'>{comment.text}</p>
          <p className='text-black-500 ml-auto text-sm italic md:text-base'>
            @{comment.username}
          </p>
          <p className='text-black-500 text-sm md:text-base'>
            {distance(new Date(comment.updatedAt))}
          </p>
          {comment.author && (
            <div className='flex mt-5 md:text-base'>
              <button
                className='mr-auto bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors'
                onClick={() => setUpdateform(true)}
              >
                Update
              </button>
              <button
                className='text-solid-pink-500 px-2 md:px-4 md:py-2 hover:underline'
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
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
