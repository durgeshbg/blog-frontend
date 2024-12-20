import PropTypes from 'prop-types';
import distance from '../../utils/time_distance';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const createdTime = new Date(post.createdAt);
  return (
    <Link
      className='w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 bg-blue-ribbon-200 p-3 rounded-md'
      to={'/posts/' + post._id}
    >
      <h3 className='text-2xl text-center tracking-wide'>{post.title}</h3>
      <p className='h-24 overflow-hidden mb-5'>{post.body}</p>
      <p className='font-thin'>Posted: {distance(createdTime)}</p>
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
