import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';
import { useEffect, useState } from 'react';
import URL from '../../utils/url';
import Post from '../Post/Post';

const Home = ({ token }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(URL + '/posts', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setPosts(data['posts']));
    }
  }, [token]);

  return (
    <>
      {!token && <Navigate to={'/login'} />}
      <h2>Posts</h2>
      <div className='posts'>
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </>
  );
};

Home.propTypes = {
  token: PropTypes.string,
};

export default Home;
