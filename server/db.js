//const firebase = require("firebase");
const config = require("./config");
const serviceAccount = require('./momocard-e107f-firebase-adminsdk-znbc4-cb6229fe62.json');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//initializeApp(config.firebaseConfig);
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;