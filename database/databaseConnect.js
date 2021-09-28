/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const mongoAtlasUri = process.env.MONGO_URL;

function run() {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri, {
      //newUrlParser: true,

    },

      () => console.log(' Mongoose is connected'),
    );
  } catch (e) {
    console.log('could not connect');
  }
}

module.exports = run;
