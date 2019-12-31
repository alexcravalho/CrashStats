const compression = require('compression');
const express = require('express');
const app = express();
const PORT = 443 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');
const db = require('../database/db.js')

app.use(express.static(path.resolve(__dirname, '..', 'client', 'src', 'dist')));
app.use(bp.json());
app.use(compression());

app.get('/api/players', (req, res) => {
  console.log("got request")
  db.player.find({})
  .then((data) => { res.send(data) })
  .catch((err) => { console.log(err) })
})


app.listen(PORT, () => {
  console.log(`Express server is running on port: ${PORT}`);
})
