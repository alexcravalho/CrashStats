const fs = require('fs');
const axios = require('axios');
const stream = fs.createWriteStream('database/players.json')

const getTeams = async () => {
    let teamsRequest = await axios.get('http://statsapi.web.nhl.com/api/v1/teams/?expand=team.roster')
    // console.log(response.data.teams)
    teamsRequest.data.teams.forEach((team) => {
      team.roster.roster.forEach((player, idx) => {
        var playerObj = {
          name: player.person.fullName,
          position: player.position.name,
          shootsCatches: '',
          height:'',
          weight: 0,
          age: 0,
          seasonStats: {}
        }

        const getPlayerInfo = async () => {

            let peopleRequest = await axios.get(`http://statsapi.web.nhl.com/api/v1/people/${player.person.id}`)
            var info = peopleRequest.data.people[0]
            playerObj.team = info.currentTeam.name;
            playerObj.shootsCatches = info.shootsCatches;
            playerObj.height = info.height;
            playerObj.weight = info.weight;
            playerObj.age = info.currentAge;

            const getSeasonStats = async () => {

              let statsRequest = await axios.get(`http://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats/?stats=statsSingleSeason&season=20182019`)

              playerObj.seasonStats = statsRequest.data.stats[0].splits[0].stat
              // console.log(statsRequest.data.stats[0].splits[0].stat)

              var newPlayer = JSON.stringify(playerObj) + ',\n'
              stream.write(newPlayer)
            }
            getSeasonStats()
            .catch((err) => { console.log(err) })
        }
        getPlayerInfo()
        .catch((err) => { console.log(err)})
      })
    })

    console.log(playerData)
}
getTeams()
.catch((err) => { console.log (err) })





