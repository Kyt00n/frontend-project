import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store';
import '../../styles/components/posts.css';
import { User } from '../../entities/User';

const API_URL = 'http://localhost:3001/api/posts';

interface Comment {
  id: number;
  postId: number;
  date: string;
  content: string;
    email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  imageUrl?: string;
  comments?: Comment[];
  likes?: number[];
}

const Posts: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeComments, setActiveComments] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentContents, setCommentContents] = useState<{ [key: number]: string }>({});
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as User;

  useEffect(() => {
    console.log('current user', currentUser);
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/upload`, {
        text: newPostContent,
        userId: currentUser.id
      });
      setNewPostContent('');
        fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCreateComment = async (postId: number) => {
    const content = commentContents[postId];
    if (!content?.trim()) return;
    try {
        if (!currentUser) {
            throw new Error('User not logged in');
        }
      const response = await axios.post(`${API_URL}/comment/${postId}`, {
        content,
        userId: currentUser.id
      });
      setCommentContents(prev => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  const handleLike = async (postId: number) => {
    try {
      await axios.post(`${API_URL}/${postId}/like?userId=${currentUser.id}`);
      fetchPosts(); // Refresh the posts by fetching the latest data
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async (postId: number) => {
    try {
      await axios.post(`${API_URL}/${postId}/unlike?userId=${currentUser.id}`, {
        userId: currentUser.id
      });
      fetchPosts(); // Refresh the posts by fetching the latest data
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };
  

  const toggleComments = (postId: number) => {
    setActiveComments(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}?limit=100`);
      console.log('Posts:', response.data.data);
      console.log('current user', currentUser);
      const postsWithImages = response.data.data.map((post: Post) => ({
        ...post,
        imageUrl: Math.random() > 0.5 ? `https://picsum.photos/800/400?random=${post.id}` : undefined
      }));
      setPosts(postsWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="posts-container">Loading posts...</div>;
  }

  return (
    <div className="posts-container">
      {currentUser && currentUser.id && (
        <div className="post-card">
          <div className="post-content">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="comment-input"
              rows={3}
            />
            <button onClick={handleCreatePost} className="action-button like-button">
              Post
            </button>
          </div>
        </div>
      )}

      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="post-user-info">
              <div className="post-username">{post.title}</div>
              <div className="post-timestamp">{post.date}</div>
            </div>
          </div>

          <div className="post-content">
            <p>{post.body}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="post-image"
              />
            )}
            <span>{post.likes?.length || 0} Likes</span>     <span>{post.comments?.length || 0} Comments</span>
          </div>
          
        {
            currentUser && currentUser.id && <div className="post-actions">
            <button
              className={`action-button like-button ${likedPosts.includes(post.id) ? 'active' : ''}`}
              onClick={() => post.likes?.includes(currentUser.id) ? handleUnlike(post.id) : handleLike(post.id)}            >
              {post.likes?.includes(currentUser.id) ? 'Unlike' : 'Like'}
            </button>
            <button
              className="action-button comment-button"
              onClick={() => toggleComments(post.id)}
            >
              Comment
            </button>
            {currentUser && post.userId === currentUser.id && (
              <button className="action-button delete-button">
                Delete
              </button>
            )}
          </div>
        }
          

          {activeComments.includes(post.id) && (
            <div className="comment-box">
              <textarea
                value={commentContents[post.id] || ''}
                onChange={(e) => setCommentContents(prev => ({
                  ...prev,
                  [post.id]: e.target.value
                }))}
                placeholder="Write a comment..."
                className="comment-input"
                rows={2}
              />
              <button 
                onClick={() => handleCreateComment(post.id)}
                className="action-button comment-button"
              >
                Send
              </button>
            </div>
          )}

          {post.comments && post.comments.length > 0 && (
            <div className="post-comments">
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-username">{comment.email}</span>
                    <span className="comment-timestamp">{post.date}</span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;