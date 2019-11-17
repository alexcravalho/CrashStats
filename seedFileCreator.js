const fs = require('fs');
const axios = require('axios');

var teamData = [];

var playerData = [];

var allPlayerIds = [];

axios.get('http://statsapi.web.nhl.com/api/v1/teams/?expand=team.roster')
  .then((response) => {
    teamData = response.data.teams;
  })
  .catch((err) => { console.log(err) })



teamData.forEach((team, idx) => {

  var teamObj = {
    id: idx,
    teamName: team.name,
    nicName: team.teamName,
    conference: team.conference.name
    division: team.division.name
    officialSiteUrl: team.officialSiteUrl
    roster: []
  }

  team.roster.roster.forEach((person) => {
    allPlayerIds.push({id: person.person.id, name: person.person.fullName})
    roster.push({id: person.person.id, name: person.person.fullName})
  })
})

