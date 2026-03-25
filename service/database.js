const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const usersCollection = db.collection('users');

const DEFAULT_SETTINGS = { datasetSize: 1000, advanceDelay: 1 };
const DEFAULT_STATS    = { totalNouns: 0, correctAnswers: 0 };

// Test the connection
(async () => {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
})();

async function createUser(email, username, password) {
  const finalUsername = (username ?? '').trim() || email.split('@')[0];
  const user = {
    email,
    username: finalUsername,
    password: await bcrypt.hash(password, 10),
    token: uuid.v4(),
    settings: { ...DEFAULT_SETTINGS },
    stats:    { ...DEFAULT_STATS },
  };
  await usersCollection.insertOne(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return usersCollection.findOne({ [field]: value });
}

async function updateUser(filter, update) {
  await usersCollection.updateOne(filter, { $set: update });
}

module.exports = { createUser, findUser, updateUser };
