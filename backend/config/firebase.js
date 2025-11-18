// backend/config/firebase.js
// Firebase initialization and configuration

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "console.firebase.google.com/project/recipe-sharing-program"
});

const db = admin.firestore();

module.exports = { admin, db };