import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store';
import '../../styles/components/posts.css';

interface Comment {
 id: number;
 postId: number;
 name: string;
 email: string;
 body: string;
}

interface Post {
 id: number;
 title: string;
 body: string;
 userId: number;
 imageUrl?: string;
 comments?: Comment[];
}

const Posts: FC = () => {
 const [posts, setPosts] = useState<Post[]>([]);
 const [loading, setLoading] = useState(true);
 const [activeComments, setActiveComments] = useState<number[]>([]);
 const [likedPosts, setLikedPosts] = useState<number[]>([]);
 const [newPostContent, setNewPostContent] = useState('');
 const [commentContents, setCommentContents] = useState<{ [key: number]: string }>({});
 const { user: currentUser } = useSelector((state: RootState) => state.auth);

 useEffect(() => {
   const fetchPosts = async () => {
     try {
       const response = await axios.get('http://localhost:3000/api/posts');
       setPosts(response.data.data);
       setLoading(false);
     } catch (error) {
       console.error('Error fetching posts:', error);
       setLoading(false);
     }
   };

   fetchPosts();
 }, []);

 const handleCreatePost = async () => {
   if (!newPostContent.trim()) return;
   try {
     const response = await axios.post('http://localhost:3000/api/posts/upload', {
       text: newPostContent,
       userId: currentUser.id
     });
     setNewPostContent('');
     setPosts([response.data.data, ...posts]);
   } catch (error) {
     console.error('Error creating post:', error);
   }
 };

 const handleCreateComment = async (postId: number) => {
   const content = commentContents[postId];
   if (!content?.trim()) return;
   try {
     const response = await axios.post(`http://localhost:3000/api/posts/comment/${postId}`, {
       content,
       userId: currentUser.id
     });
     setCommentContents(prev => ({ ...prev, [postId]: '' }));
     setPosts(prev =>
       prev.map(post =>
         post.id === postId
           ? { ...post, comments: [...(post.comments || []), response.data.data] }
           : post
       )
     );
   } catch (error) {
     console.error('Error creating comment:', error);
   }
 };

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
           <div className="post-user-avatar"></div>
           <div className="post-user-info">
             <div className="post-username">User {post.userId}</div>
             <div className="post-timestamp">{formatDate()}</div>
           </div>
         </div>

         <div className="post-content">
           <h3>{post.title}</h3>
           <p>{post.body}</p>
           {post.imageUrl && (
             <img
               src={post.imageUrl}
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
                   <span className="comment-timestamp">{formatDate()}</span>
                 </div>
                 <div className="comment-content">
                   {comment.body}
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