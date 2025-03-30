import React from "react";
import "../styles/post.scss";

interface PostProps {
  posts: { title: string; category: string }[];
}

const Post: React.FC<PostProps> = ({ posts }) => {
  return (
    <div className="page post">
      <h1>Strona Wpisu</h1>
      <ul>
        {posts.map((post: { title: string; category: string }, index: number) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>Kategoria: {post.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
