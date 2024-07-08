import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import './Comment.css';
import URL from '../../utils/url';
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment, token }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (token) {
      fetch(URL + '/posts/' + comment.post + '/comments/' + comment._id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => navigate(0));
    }
  };
  return (
    <>
      <div className='comment'>
        <div className='text'>{comment.text}</div>
        <div className='username'>@{comment.username}</div>
        <div className='time'>{distance(new Date(comment.updatedAt))}</div>
        {comment.author && <button onClick={handleDelete}>Delete</button>}
      </div>
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
};

export default Comment;
