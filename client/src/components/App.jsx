import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBar from './InputBar.jsx';
import TeamA from './TeamA.jsx';
import TeamB from './TeamB.jsx';

function App(props) {
  const [labels, setLabel] = useState(['Goals :', 'Assists :', 'Points :', 'Plus Minus:', 'Penalty Min :', 'Hits :', 'Shots on Goal :', 'Power Play Goals :', 'Power Play Points :', 'Blocked Shots :', 'Wins :', 'Goals Against :', 'Saves :', 'Shutouts :'])

  const [playerList, setPlayerList] = useState([]);
  const [teamAOverall, setTeamAOverall] = useState(0);
  const [teamBOverall, setTeamBOverall] = useState(0);
  const [fairTrade, setFairTrade] = useState('');
  const [weightObj, setWeightObj] = useState({});
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    axios.get(`/api/players`)
    .then(({ data }) => { setPlayerList(data) })
    .catch((err) => { console.log(err) })
  }, [])

  const calculateOverall = (player) => {
    var overall = 0;
    var p = player.seasonStats;
    if (player.position.toLowerCase() === "goalie") {
      overall+= p.wins * (Number(weightObj[10]) || 5);
      overall+= p.goalsAgainst * (Number(weightObj[11]) || -2);
      overall+= p.saves * (Number(weightObj[12]) || .6);
      overall+= p.shutouts * (Number(weightObj[13]) || 5);
    } else {
      overall+= p.goals * (Number(weightObj[0]) || 6);
      overall+= p.assists * (Number(weightObj[1]) || 4);
      overall+= p.points * (Number(weightObj[2]) || 0);
      overall+= p.plusMinus * (Number(weightObj[3]) || 2);
      overall+= p.pim * (Number(weightObj[4]) || .4);
      overall+= p.hits * (Number(weightObj[5]) || .3);
      overall+= p.shots * (Number(weightObj[6]) || .9);
      overall+= p.powerPlayGoals * (Number(weightObj[7]) || 0);
      overall+= p.powerPlayPoints * (Number(weightObj[8]) || 2);
      overall+= p.blocked * (Number(weightObj[9]) || 1);
    }
    return overall;
  }

  const compareOverallScores = () => {
    if (Number(teamAOverall) > Number(teamBOverall)) {
      var difference = teamAOverall - teamBOverall;
      var result = (difference / teamAOverall) * 100;
      if (result <= 5) {
        setFairTrade('good');
      } else {
        setFairTrade('bad');
      }
    }
    if (Number(teamBOverall) > Number(teamAOverall)) {
      var difference = teamBOverall - teamAOverall;
      var result = (difference / teamBOverall) * 100;
      if (result <= 5) {
        setFairTrade('good');
      } else {
        setFairTrade('bad');
      }
    }
    if (Number(teamAOverall) === Number(teamBOverall)) {
      setFairTrade('good')
    }
  }

  return (
  <div className="main-container">
    <div className="main-left">
      <div className="main-color"></div>
      <div className="trade-dash">
          <TeamA setTeamAOverall={setTeamAOverall} calculateOverall={calculateOverall} playerList={playerList}/>
      </div>
    </div>
    <div className="main-center">
      <div className="main-color"></div>
      <div className="titles">
        <h1>Crash Stats</h1>
        <h1>Trade Calculator</h1>
      </div>
      <img src="https://crash-stats.s3-us-west-2.amazonaws.com/CrashLogo.png" alt="logo"></img>
      {fairTrade === '' && <div className="button_cont" align="center"><div className="example_a" onClick={compareOverallScores}>TRADE</div></div>}
      {fairTrade === 'good' && <div className="fair-trade">Fair Trade ✓</div>}
      {fairTrade === 'bad' && <div className="bad-trade">Bad Trade ✘</div>}
      {!reveal && <div className='heavy'>To Change the Weighting System</div>}
      {!reveal && <a className='dropdown' onClick={() => { setReveal(!reveal) } }>click here</a>}
      {reveal && <a className='dropdown' onClick={() => { setReveal(!reveal) } }>collapse</a>}
      {reveal && <div className='heavy'>Edit Player Stats Weighting Here</div>}
      {reveal && <div className="settings">
        {labels.map((label, idx) => (
          <InputBar setWeightObj={setWeightObj} key={idx} num={idx} text={label} obj={weightObj} />
        ))}
      </div>}
    </div>
    <div className="main-right">
      <div className="main-color"></div>
      <div className="trade-dash">
         <TeamB setTeamBOverall={setTeamBOverall} calculateOverall={calculateOverall} playerList={playerList}/>
      </div>
    </div>
  </div>
  )
};

export default App;


