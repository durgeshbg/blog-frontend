import { useEffect, useState } from 'react';
import URL from '../../utils/url';
import distance from '../../utils/time_distance';
import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom';

const PostDisplay = () => {
  const [token] = useOutletContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postData, commentsData] = await Promise.all([
          // Fetch Posts
          fetch(URL + '/posts/' + id, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          // Fetch Comments
          fetch(URL + '/posts/' + id + '/comments', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
        ]);
        // Set Post and Comment state
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
        <div className='container'>
          <div className='post-display'>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
            <div>Posted: {distance(new Date(post.updatedAt))}</div>
            {localStorage.getItem('admin') === 'true' && (
              <Link to={'/posts/' + id + '/update'}>Update</Link>
            )}
          </div>
          <div className='comments'>
            <h3>Comments: </h3>
            {comments &&
              (typeof comments === 'object' ? (
                comments.map((comment) => {
                  return (
                    <div key={comment._id} className='comment'>
                      <div className='text'>{comment.text}</div>
                      <div className='username'>@{comment.username}</div>
                      <div className='time'>{distance(new Date(comment.updatedAt))}</div>
                    </div>
                  );
                })
              ) : (
                <div>No comments</div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDisplay;
