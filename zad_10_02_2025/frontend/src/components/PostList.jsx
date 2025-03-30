import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Lista postów</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;