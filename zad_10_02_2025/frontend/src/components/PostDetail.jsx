import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania posta:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setPost(prevPost => ({
      ...prevPost,
      comments: [...prevPost.comments, newComment]
    }));
  };

  if (!post) return <div>Ładowanie...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      <h2>Komentarze ({post.comments.length})</h2>
      <ul>
        {post.comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default PostDetail;