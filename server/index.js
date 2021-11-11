const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mixpost');

app.post('/api/session', async (req, res) => {
  console.log(req.body);
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

app.listen(5000, () => {
  console.log('Server started on 5000');
});
