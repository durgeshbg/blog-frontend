import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import URL from '../../utils/url';
import distance from '../../utils/time_distance';
import { Navigate } from 'react-router-dom';

const PostDisplay = ({ id, token }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postData, commentsData] = await Promise.all([
          fetch(URL + '/posts/' + id, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          fetch(URL + '/posts/' + id + '/comments', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
        ]);
        setPost(postData['post']);
        setComments(commentsData['comments']);
      } catch (err) {
        console.error(err);
      }
    }
    if (token) {
      fetchData();
    }
  }, [id, token]);
  return (
    <>
      {!token && <Navigate to={'/login'} />}
      {post && (
        <div className='post-display'>
          <div className='post'>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>Posted: {distance(new Date(post.updatedAt))}</p>
          </div>
          <div className='comments'>
            <h3>Comments: </h3>
            {comments.map((comment) => {
              return (
                <div key={comment._id} className='comment'>
                  <div className='text'>{comment.text}</div>
                  <div className='username'>@{comment.username}</div>
                  <div className='time'>{distance(new Date(comment.updatedAt))}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

PostDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default PostDisplay;
