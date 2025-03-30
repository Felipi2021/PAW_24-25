const express = require('express');
const cors = require('cors');
const { posts } = require('./data');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  const postPreviews = posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content.substring(0, 100) + '...'
  }));
  res.json(postPreviews);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post nie znaleziony');
  res.json(post);
});

app.post('/api/posts/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post nie znaleziony');

  const newComment = {
    id: Date.now(),
    postId: post.id,
    author: req.body.author,
    content: req.body.content
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});