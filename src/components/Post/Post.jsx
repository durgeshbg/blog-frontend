import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ post }) => {
  const createdTime = new Date(post.createdAt);
  return (
    <Link className='post' to={'/posts/' + post._id}>
      <div>
        <div className='title'>{post.title}</div>
        <div className='body'>{post.body}</div>
        <div className='time'>Posted: {distance(createdTime)}</div>
      </div>
    </Link>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    public: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

export default Post;
