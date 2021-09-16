//  'use strict';

require('dotenv').config();
const express = require('express');


const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to mongo!');
})
mongoose.connect(process.env.MONGODB_URL);


const Books = require('./models/books');
const app = express();

const cors = require('cors');

app.use(cors());

//  handel requests from json
 app.use(express.json());


// route handlers

app.get('/books', async (req, res) => {
  console.log('this is the req on the ', req);
  const location = req.query.location;
  const findQuery = {};
  if (location) {
    findQuery.location = location;
  }
  const books = await Books.find(findQuery);
  res.send(books);
})
 app.post('/books', postBooks);
  // app.delete('books/:id', deletedBooks)
//  app.post('/books', (req ,res) => {
//  res.send('Lumos');
//  })
// Start Server Here


const PORT = process.env.PORT;
if (!parseInt(PORT)) throw 'Invalid PORT';

app.listen(PORT, () => console.log(`listening on ${PORT}`));



async function postBooks(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);

  try {
    const newBooks = await Books.create(req.body);
    res.send(newBooks);
  } catch (err) {
    handleError(err, res);
  }
}
async function deletebooks(req, res) {

  // value from route /books/:id

  let id = req.params.id;

  try {
    await Books.findByIdAndDelete(id);
    res.status(204).send();
  }
  catch (err) {
    handleError(err, res);
  }
}

// move this to a module
function handleError(err, res) {
  console.error(err);
  res.status(500).send('oops!');
}







 