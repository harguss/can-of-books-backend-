const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL);

const Books = require('./models/books');

async function seed() {

  console.log('Deleting existing books');
  await Books.deleteMany({});
  

  const myBooks = new Books({
    title: 'Harry Potter', 
    discription : 'Best Book EVER', 
    status : false, 
    email: 'shargus@mac'
  });

  myBooks.save();
  
  
  mongoose.disconnect();
}

seed();

