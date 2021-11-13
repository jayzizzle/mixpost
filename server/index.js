const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const jwt = require('jsonwebtoken');

const User = require('./models/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.log(error));

app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: 'error', error: 'Username/Email already taken.' });
  }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      'secretOrKey' // must hide this later
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.get('/api/quote', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secretOrKey'); // must hide this later
    const username = decoded.username;
    const user = await User.findOne({ username: username });
    return { status: 'ok', quote: user.quote };
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'Invalid Token' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
