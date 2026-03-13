const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// Users, settings, and stats are kept in memory and reset on service restart.
let users = [];

const DEFAULT_SETTINGS = { datasetSize: 1000, advanceDelay: 1 };
const DEFAULT_STATS    = { totalNouns: 0, correctAnswers: 0 };

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth — register a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, username, password } = req.body;

  if (await findUser('email', email)) {
    return res.status(409).send({ msg: 'Email already registered' });
  }

  const user = await createUser(email, username, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email, username: user.username });
});

// GetAuth — log in an existing user (identifier = username or email)
apiRouter.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  const user = (await findUser('username', identifier)) ?? (await findUser('email', identifier));
  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    return res.send({ email: user.email, username: user.username });
  }

  res.status(401).send({ msg: 'Invalid credentials' });
});

// DeleteAuth — log out
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Verify that the request carries a valid auth cookie
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetSettings
apiRouter.get('/user/settings', verifyAuth, (req, res) => {
  res.send(req.user.settings);
});

// SaveSettings
apiRouter.put('/user/settings', verifyAuth, (req, res) => {
  const { datasetSize, advanceDelay } = req.body;
  req.user.settings = { datasetSize, advanceDelay };
  res.send(req.user.settings);
});

// GetStats
apiRouter.get('/user/stats', verifyAuth, (req, res) => {
  res.send(req.user.stats);
});

// RecordAnswer — increment totalNouns and potentially correctAnswers
apiRouter.post('/user/stats/record', verifyAuth, (req, res) => {
  const { isCorrect } = req.body;
  req.user.stats.totalNouns     += 1;
  req.user.stats.correctAnswers += isCorrect ? 1 : 0;
  res.send(req.user.stats);
});

// Default error handler
app.use((err, _req, res, _next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

// Fall back to index.html for any unknown path
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

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
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value) ?? null;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge:   1000 * 60 * 60 * 24 * 365,
    secure:   true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port);
