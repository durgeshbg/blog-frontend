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
            <div className='px-8 py-3'>
              <h1 className='text-center text-6xl mb-6'>{post.title}</h1>
              <p className='leading-loose tracking-widest px-8 py-3 text-2xl'>
                {post.body}
              </p>
              {localStorage.getItem('admin') === 'true' && (
                <div className='flex flex-col items-center'>
                  <div className='flex justify-between w-1/5 mb-5'>
                    <div>
                      <button
                        className='bg-blue-500 px-5 py-2 rounded-md'
                        onClick={() => setUpdateForm(true)}
                      >
                        Update
                      </button>
                    </div>
                    <div>
                      <button
                        className='bg-rose-500 px-5 py-2 rounded-md'
                        onClick={() => setConfirm(true)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div>
                    {confirm && (
                      <div className='flex flex-col justify-center mb-5'>
                        <p className='font-bold text-lg'>
                          Would you like to really delete?
                        </p>
                        <div className='flex justify-center gap-4'>
                          <button
                            className='bg-rose-500 px-5 py-2 rounded-md'
                            onClick={handleDelete}
                          >
                            Yes
                          </button>
                          <button
                            className='bg-green-500 px-5 py-2 rounded-md'
                            onClick={() => setConfirm(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p className='text-center bg-orange-500 text-2xl px-8 py-3'>
                Posted: {distance(new Date(post.createdAt))}
              </p>
            </div>
          )}
          <div className='comments'>
            <h2 className='text-3xl px-8' >Comments: </h2>
            <div>
              <CommentForm
                postId={post._id}
                updateComments={updateComments}
                token={token}
              />
            </div>
            <div className='flex flex-col px-8 mb-9'>
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
