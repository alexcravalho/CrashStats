import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBar from './InputBar.jsx';
import TeamA from './TeamA.jsx';
import TeamB from './TeamB.jsx';

function App(props) {
  const [labels, setLabel] = useState(['Goals :', 'Assists :', 'Points :', '+/- :', 'Penalty Min :', 'Hits :', 'Shots on Goal :', 'Power Play Goals :', 'Power Play Points :', 'Time on Ice :'])

  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    axios.get(`/api/players`)
    .then(({ data }) => { setPlayerList(data) })
    .catch((err) => { console.log(err) })
  }, [])

  const calculateOverall = (player) => {
    var overall = 0;
    var p = player.seasonStats;
    if (player.position.toLowerCase() === "goalie") {
      overall+= p.wins * 5;
      overall+= p.goalsAgainst * -2;
      overall+= p.saves *.6;
      overall+= p.shutouts * 5;
    } else {
      overall+= p.goals * 6;
      overall+= p.assists * 4;
      overall+= p.shots * .9;
      overall+= p.hits * .3;
      overall+= p.pim * .4;
      overall+= p.plusMinus * 2;
      overall+= p.powerPlayPoints * 2;
      overall+= p.blocked;
    }
    return overall;
  }

  return (
  <div className="main-container">
    {/* <div>Enter the weights of Player stats here</div>
    <div className="settings">
      {labels.map((label, idx) => (
        <InputBar key={idx} text={label}/>
      ))}
    </div> */}
    <h1>Crash Stats</h1>
    <div className="trade-dash">
        <TeamA calculateOverall={calculateOverall} playerList={playerList}/>
        <TeamB calculateOverall={calculateOverall} playerList={playerList}/>
    </div>
  </div>
  )
};

export default App;
