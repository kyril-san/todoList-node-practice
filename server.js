const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
try {
  mongoose.connect(DB).then(() => console.log('DB Connection Successful'));
} catch (error) {
  console.log(error);
}

const app = require('./app');

app.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
