const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public/static')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/o-nas', (req, res) => {
  res.render('about');
});
app.get('/oferta', (req, res) => {
  res.render('offer');
});
app.get('/kontakt', (req, res) => {
    res.render('contact');
  });
  app.post('/kontakt', (req, res) => {
    console.log('Otrzymane dane formularza:', req.body);
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});