import { usePost } from '../api/posts';
import { useUser } from '../api/posts';
import { useParams, Link } from 'react-router-dom';
import styles from "../styles/PostDetails.module.css";

export const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = postId ? parseInt(postId, 10) : 0;

  const { 
    data: post, 
    isLoading: isPostLoading, 
    isError: isPostError 
  } = usePost(numericPostId);
  
  const { 
    data: user, 
    isLoading: isUserLoading, 
    isError: isUserError 
  } = useUser(post?.userId || 0);

  if (isPostLoading) return <div className={styles.loading}>Loading post...</div>;
  if (isPostError) return <div className={styles.error}>Error loading post</div>;
  if (!post) return <div className={styles.error}>Post not found</div>;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Back to all posts</Link>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postBody}>{post.body}</p>
      
      {isUserLoading && <div className={styles.loading}>Loading user...</div>}
      {isUserError && <div className={styles.error}>Error loading user</div>}
      {user && (
        <div className={styles.authorSection}>
          <h2 className={styles.authorTitle}>Author</h2>
          <p className={styles.authorInfo}>Name: {user.name}</p>
          <p className={styles.authorInfo}>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};