const express = require('express');
const bodyParser = require('body-parser');
const wpisRouter = require('./routers/wpis');
const kategoriaRouter = require('./routers/kategoria');
const komentarzRouter = require('./routers/komentarz');

const app = express();

app.use(bodyParser.json());
app.use('/api/wpisy', wpisRouter);
app.use('/api/kategorie', kategoriaRouter);
app.use('/api/komentarze', komentarzRouter);
app.get('/', (req, res) => {
    res.send('witam na moim blogu');
  });
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
