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
            <div className='m-3 lg:mx-auto p-3 px-5 rounded-sm bg-blue-ribbon-100 lg:w-9/12'>
              <h1 className='text-blue-ribbon-500 font-bold text-xl md:text-2xl mb-5 '>
                {post.title}
              </h1>
              <p className='leading-7 mb-5 md:text-xl md:leading-6'>{post.body}</p>
              {localStorage.getItem('admin') === 'true' && (
                <div className=''>
                  <div className='self-center flex items-baseline gap-5'>
                    <button
                      className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors mb-4'
                      onClick={() => setUpdateForm(true)}
                    >
                      Update
                    </button>
                    <button
                      className='text-solid-pink-500 px-2 md:px-4 md:py-2 hover:underline'
                      onClick={() => setConfirm(true)}
                    >
                      Delete
                    </button>
                  </div>

                  {confirm && (
                    <div className='flex flex-col'>
                      <p className='text-center mb-2'>Would you like to really delete?</p>
                      <div className='self-center flex items-baseline gap-5'>
                        <button
                          className='text-solid-pink-500 px-2 md:px-4 md:py-2 hover:underline'
                          onClick={handleDelete}
                        >
                          Yes
                        </button>
                        <button
                          className='bg-blue-ribbon-500 text-white rounded-sm px-2 py-1 md:px-4 md:py-2 lg:mr-5 lg:ml-auto hover:bg-blue-ribbon-400 transition-colors mb-4'
                          onClick={() => setConfirm(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <p className='font-extralight ml-auto text-sm md:text-base'>
                Posted: {distance(new Date(post.createdAt))}
              </p>
            </div>
          )}
          <div className='m-3'>
            <h2 className='text-blue-ribbon-500 font-bold lg:text-center'>Comments: </h2>
            <div>
              <CommentForm
                postId={post._id}
                updateComments={updateComments}
                token={token}
              />
            </div>
            <div className=''>
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
