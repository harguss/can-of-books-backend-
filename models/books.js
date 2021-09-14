const mongoose = require('mongoose');
const { Schema } = mongoose;


const booksSchema = new Schema({
  title: String, 
  discription : String, 
  status : Boolean, 
  email: String,
  });

const Books = mongoose.model( 'Books', booksSchema);
module.exports = Books