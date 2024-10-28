
const path = require('path');
const port = 3000;
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'zad28102024' 
});

db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
    return;
  }
  console.log('Połączono z bazą danych MySQL');
});

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public/static')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/o-nas', (req, res) => {
  res.render('about');
});
app.get('/oferta', (req, res) => {
  res.render('offer');
});

//zadanie 21 pazdziernika tutaj

app.get('/kontakt', (req, res) => {
    res.render('contact');
  });
//   app.post('/kontakt', (req, res) => {
//     console.log('Otrzymane dane formularza:', req.body);
//     res.redirect('/');
//   });

 //

 //zadanie 28 pazdziernika tutaj

 app.post('/kontakt', (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  console.log('Odebrane dane formularza:', req.body);

  const sql = 'INSERT INTO messages (firstName, lastName, email, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, message], (err, result) => {
    if (err) {
      console.error('Błąd podczas zapisywania wiadomości:', err);
      res.status(500).send('Wystąpił błąd podczas zapisywania wiadomości');
      return;
    }
    console.log('Wiadomość zapisana do bazy danych:', result);
    res.redirect('/');
  });
});

app.get('/api/contact-messages', (req, res) => {
  const sql = 'SELECT * FROM messages';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania wiadomości:', err);
      res.status(500).send('Wystąpił błąd podczas pobierania wiadomości');
      return;
    }
    res.json(results);
  });
});

app.get('/api/contact-messages/:id', (req, res) => {
  const messageId = req.params.id;
  const sql = 'SELECT * FROM messages WHERE id = ?';
  db.query(sql, [messageId], (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania wiadomości:', err);
      res.status(500).send('Wystąpił błąd podczas pobierania wiadomości');
      return;
    }
    
    if (results.length === 0) {
      res.status(404).send('Wiadomość o takim ID nie istnieje');
      return;
    }
    
    res.json(results[0]);
  });
});
//
app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});