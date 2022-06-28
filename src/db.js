const admin = require('firebase-admin');
const serviceAccount = require('../chat_app.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
