import { Navigate, useOutletContext } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import URL from '../../utils/url';
import Post from '../Post/Post';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [token] = useOutletContext();

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

  if (!token) <Navigate to={'/login'} />;

  return (
    <>
      <h2>Posts</h2>
      <div className='posts'>
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </>
  );
};

export default Home;
