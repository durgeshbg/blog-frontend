import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const createdTime = new Date(post.createdAt);
  return (
    <Link
      className='border-2 border-blue-500 max-w-3xl px-5 py-5 rounded'
      to={'/posts/' + post._id}
    >
      <h3 className='bg-orange-600 text-4xl text-center'>{post.title}</h3>
      <p className='line-clamp-5 leading-8 px-3 hover:text-orange-500'>{post.body}</p>
      <p className='text-left font-bold text-orange-600 px-3'>
        Posted: {distance(createdTime)}
      </p>
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
