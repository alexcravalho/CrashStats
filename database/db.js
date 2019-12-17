const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/players', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err));

const { Schema } = mongoose;

const playerSchema = new Schema({
  id: Number,
  name: String,
  firstName: String,
  lastName: String,
  position: String,
  team: String,
  height: String,
  weight: Number,
  age: Number,
  seasonStats: Object,
});

const player = mongoose.model('player', playerSchema);

module.exports.player = player;
