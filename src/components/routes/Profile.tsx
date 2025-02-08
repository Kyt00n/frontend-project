import React, { FC, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import { User } from "../../entities/User";
import axios from "axios";
import { Post } from "../../entities/Post";

const Profile: FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as User;
  const API_URL = 'http://localhost:3001/api/posts/user'
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/${currentUser.id}`);
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
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Your posts:</strong>
      {
        posts.map(post => (
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
            </div></div>
            ))
      }
    </div>
  );
};

export default Profile;