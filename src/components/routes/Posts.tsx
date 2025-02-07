import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store';
import '../../styles/components/posts.css';

const API_URL = 'http://localhost:3001/api/posts';

interface Comment {
    id: number;
    content: string | null;
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
    post: {
        id: number;
        text: string;
        images: string[];
    };
}

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    imageUrls?: string;
    comments?: Comment[];
}

const Posts: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeComments, setActiveComments] = useState<number[]>([]);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get(`${API_URL}?limit=2`);
                // const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=2');
                console.log(postsResponse.data);
                const postsWithComments = await Promise.all(
                    postsResponse.data.data.map(async (post: Post) => {
                        // Add random image to some posts
                        
                        const hasImage = Math.random() > 0.5;
                        return { 
                            ...post,
                            imageUrl: hasImage ? `https://picsum.photos/800/400?random=${post.id}` : undefined
                        };
                    })
                );
                setPosts(postsWithComments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = () => {
        return new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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

    if (loading) {
        return <div className="posts-container">Loading posts...</div>;
    }

    return (
        <div className="posts-container">
            {currentUser && (
                <div className="post-card">
                    <div className="post-content">
                        <textarea 
                            placeholder="What's on your mind?"
                            className="comment-input"
                            rows={3}
                        />
                        <button className="action-button like-button">Post</button>
                    </div>
                </div>
            )}

            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <div className="post-user-avatar"></div>
                        <div className="post-user-info">
                            <div className="post-username">User {post.userId}</div>
                            <div className="post-timestamp">{formatDate()}</div>
                        </div>
                    </div>

                    <div className="post-content">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        {post.imageUrls && (
                            <img 
                                src={post.imageUrls} 
                                alt={post.title}
                                className="post-image"
                            />
                        )}
                    </div>

                    <div className="post-actions">
                        <button 
                            className={`action-button like-button ${likedPosts.includes(post.id) ? 'active' : ''}`}
                            onClick={() => toggleLike(post.id)}
                        >
                            {likedPosts.includes(post.id) ? 'Liked' : 'Like'}
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

                    {activeComments.includes(post.id) && (
                        <div className="comment-box">
                            <textarea
                                placeholder="Write a comment..."
                                className="comment-input"
                                rows={2}
                            />
                            <button className="action-button comment-button">
                                Send
                            </button>
                        </div>
                    )}

                    {post.comments && post.comments.length > 0 && (
                        <div className="post-comments">
                            {post.comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <div className="comment-header">
                                        <span className="comment-username">{comment.user ? comment.user.email : 'Unknown User'}</span>
                                        <span className="comment-timestamp">{formatDate()}</span>
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