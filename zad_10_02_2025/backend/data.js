let posts = [
    {
      id: 1,
      title: 'Pierwszy post',
      content: 'To jest treść pierwszego posta.',
      comments: [
        { id: 1, postId: 1, author: 'Jan Kowalski', content: 'Świetny post!' },
        { id: 2, postId: 1, author: 'Anna Nowak', content: 'Dziękuję za informacje.' }
      ]
    },
    {
      id: 2,
      title: 'Drugi post',
      content: 'To jest treść drugiego posta.',
      comments: [
        { id: 3, postId: 2, author: 'Piotr Wiśniewski', content: 'Interesujące.' }
      ]
    }
  ];
  
  module.exports = {
    posts
  };