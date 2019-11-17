const express = require('express');
const app = express();
const PORT = 7000 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'src', 'dist')));
app.use(bp.json());

app.listen(PORT, () => {
  console.log(`Express server is runing on port: ${PORT}`);
})