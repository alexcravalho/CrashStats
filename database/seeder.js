const db = require('./db.js');
const array = require('./players.json');

async function addData() {
  const promises = [];
  for (let i = 0; i < array.length; i++) {
    const obj = {
      id: i,
      name: array[i].name,
      position: array[i].position,
      team: array[i].team,
      height: array[i].height,
      weight: array[i].weight,
      age: array[i].age,
      seasonStats: array[i].seasonStats
    };
    // eslint-disable-next-line no-await-in-loop
    const newPlayer = await db.player.create(obj);
    promises.push(newPlayer);
  }
  return promises;
}

addData()
  .then(() => {
    console.log('Database complete!');
    process.exit();
  })
  .catch((err) => {
    console.log('An error occurred in database creation');
    console.log(err);
  });