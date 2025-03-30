import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
        author,
        content
      });
      
      onCommentAdded(response.data);
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Błąd podczas dodawania komentarza:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj komentarz</h3>
      <div>
        <label>
          Autor:
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>
          Treść:
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </label>
      </div>
      <button type="submit">Dodaj komentarz</button>
    </form>
  );
};

export default CommentForm;