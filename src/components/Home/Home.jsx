import { Navigate, useOutletContext } from 'react-router-dom';
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

  if (!token) return <Navigate to={'/login'} />;

  return (
    <>
      <h1 className='text-5xl text-center mb-5'>Posts</h1>
      <div className='mb-9 flex flex-wrap justify-center gap-5'>
        {posts &&
          (typeof posts === 'object'
            ? posts.map((post) => <Post key={post._id} post={post} />)
            : 'No posts to display')}
      </div>
    </>
  );
};

export default Home;
