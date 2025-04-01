import { usePosts } from '../api/posts';
import { Link } from 'react-router-dom';
import styles from '../styles/PostList.module.css';

export const PostsList = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <div className={styles.loading}>Loading posts...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!posts) return <div className={styles.error}>No posts found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
      <ul className={styles.postsList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link to={`/posts/${post.id}`} className={styles.link}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postBody}>{post.body.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};