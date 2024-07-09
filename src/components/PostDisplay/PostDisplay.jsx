import { useEffect, useState } from 'react';
import URL from '../../utils/url';
import distance from '../../utils/time_distance';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';
import CommentForm from '../Form/CommentForm';
import PostForm from '../Form/PostForm';

const PostDisplay = () => {
  const [token] = useOutletContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(URL + '/posts/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => navigate('/'));
  };

  const updateComments = (comment, type) => {
    const filteredComments = comments.filter((c) => comment._id !== c._id);
    if (type === 'update') {
      setComments([{ ...comment, author: true }, ...filteredComments]);
    } else if (type === 'delete') {
      setComments(filteredComments);
    }
  };

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

  if (!token) navigate('/login');

  return (
    <>
      {post && (
        <div>
          {updateForm ? (
            <PostForm
              setPost={setPost}
              setUpdateForm={setUpdateForm}
              tokenFromUpdate={token}
              post={post}
            />
          ) : (
            <div>
              <h1>{post.title}</h1>
              <div>{post.body}</div>
              <div>Posted: {distance(new Date(post.createdAt))}</div>
              {localStorage.getItem('admin') === 'true' && (
                <div>
                  <div>
                    <button onClick={() => setUpdateForm(true)}>Update</button>
                  </div>
                  <div>
                    <button onClick={() => setConfirm(true)}>Delete</button>
                  </div>

                  <div>
                    {confirm && (
                      <>
                        <div>Would you like to really delete?</div>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={() => setConfirm(false)}>No</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='comments'>
            <h3>Comments: </h3>
            <div>
              <CommentForm
                postId={post._id}
                updateComments={updateComments}
                token={token}
              />
            </div>
            <div className='comments'>
              {comments &&
                (typeof comments === 'object'
                  ? comments.map((comment) => (
                      <Comment
                        updateComments={updateComments}
                        key={comment._id}
                        token={token}
                        comment={comment}
                        postId={post._id}
                      />
                    ))
                  : 'No comments')}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDisplay;
