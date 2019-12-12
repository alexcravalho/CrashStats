import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBar from './InputBar.jsx';
import TeamA from './TeamA.jsx';
import TeamB from './TeamB.jsx';

function App(props) {
  const [labels, setLabel] = useState(['Goals :', 'Assists :', 'Points :', '+/- :', 'Penalty Min :', 'Hits :', 'Shots on Goal :', 'Power Play Goals :', 'Power Play Points :', 'Time on Ice :'])

  const [playerList, setPlayerList] = useState([]);
  const [teamAOverall, setTeamAOverall] = useState(0);
  const [teamBOverall, setTeamBOverall] = useState(0);
  const [fairTrade, setFairTrade] = useState('');
  const [weightObj, setWeightObj] = useState({});

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

  const compareOverallScores = () => {
    if (teamAOverall > teamBOverall) {
      var difference = teamAOverall - teamBOverall;
      var result = (difference / teamAOverall) * 100;
      if (result <= 5) {
        setFairTrade('good');
      } else {
        setFairTrade('bad');
      }
    }
    if (teamBOverall > teamAOverall) {
      var difference = teamBOverall - teamAOverall;
      var result = (difference / teamBOverall) * 100;
      if (result <= 5) {
        setFairTrade('good');
      } else {
        setFairTrade('bad');
      }
    }
  }



  return (
  <div className="main-container">
    <div className="main-color"></div>
    <div>Enter the weights of Player stats here</div>
    <div className="settings">
      {labels.map((label, idx) => (
        <InputBar setWeightObj={setWeightObj} key={idx} num={idx} text={label}/>
      ))}
    </div>
    <div className="titles">
    <h1>Crash Stats</h1>
    <h1>Trade Calculator</h1>
    </div>

    <img src="images/CrashLogo.png" alt="logo"></img>
    {fairTrade === '' && <div className="button_cont" align="center"><div className="example_a" onClick={compareOverallScores}>TRADE</div></div>}
    {fairTrade === 'good' && <div className="fair-trade">Fair Trade ✓</div>}
    {fairTrade === 'bad' && <div className="bad-trade">Bad Trade ✘</div>}
    <div className="trade-dash">
        <TeamA setTeamAOverall={setTeamAOverall} calculateOverall={calculateOverall} playerList={playerList}/>
        <TeamB setTeamBOverall={setTeamBOverall} calculateOverall={calculateOverall} playerList={playerList}/>
    </div>
  </div>
  )
};

export default App;


