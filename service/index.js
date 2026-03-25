const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./database.js');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth — register a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, username, password } = req.body;

  if (await DB.findUser('email', email)) {
    return res.status(409).send({ msg: 'Email already registered' });
  }

  const user = await DB.createUser(email, username, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email, username: user.username });
});

// GetAuth — log in an existing user (identifier = username or email)
apiRouter.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  const user = (await DB.findUser('username', identifier)) ?? (await DB.findUser('email', identifier));
  if (user && await bcrypt.compare(password, user.password)) {
    const token = uuid.v4();
    await DB.updateUser({ email: user.email }, { token });
    setAuthCookie(res, token);
    return res.send({ email: user.email, username: user.username });
  }

  res.status(401).send({ msg: 'Invalid credentials' });
});

// DeleteAuth — log out
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.findUser('token', req.cookies[authCookieName]);
  if (user) await DB.updateUser({ email: user.email }, { token: null });
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Verify that the request carries a valid auth cookie
const verifyAuth = async (req, res, next) => {
  const user = await DB.findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetUser — return the currently authenticated user
apiRouter.get('/user', verifyAuth, (req, res) => {
  res.send({ email: req.user.email, username: req.user.username });
});

// GetSettings
apiRouter.get('/user/settings', verifyAuth, (req, res) => {
  res.send(req.user.settings);
});

// SaveSettings
apiRouter.put('/user/settings', verifyAuth, async (req, res) => {
  const { datasetSize, advanceDelay } = req.body;
  const settings = { datasetSize, advanceDelay };
  await DB.updateUser({ email: req.user.email }, { settings });
  res.send(settings);
});

// GetStats
apiRouter.get('/user/stats', verifyAuth, (req, res) => {
  res.send(req.user.stats);
});

// RecordStats — apply a batched delta to the user's stats
apiRouter.post('/user/stats/record', verifyAuth, async (req, res) => {
  const { nounsDelta, correctDelta } = req.body;
  const stats = {
    totalNouns:     req.user.stats.totalNouns + nounsDelta,
    correctAnswers: req.user.stats.correctAnswers + correctDelta,
  };
  await DB.updateUser({ email: req.user.email }, { stats });
  res.send(stats);
});

// Default error handler
app.use((err, _req, res, _next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

// Fall back to index.html for any unknown path
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge:   1000 * 60 * 60 * 24 * 365,
    secure:   true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port);
