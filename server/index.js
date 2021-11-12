const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const User = require('./models/user');

app.use(cors());
app.use(express.json());

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
    return res.json({ status: 'ok', user: true });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.listen(5000, () => {
  console.log('Server started on 5000');
});
