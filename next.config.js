const path = require('path');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

module.exports = {
  env: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: '',
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
