import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBarB from './SearchBarB.jsx';
import ListNameB from './ListNameB.jsx';

function TeamB(props) {

  const [bList, setBList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const addBList = (player) => {
    var newList = bList.slice()
    newList.push(player)
    setBList(newList)
  }

  const deleteBList = (player) => {
    var newList = bList.slice();
    bList.forEach((ply, idx) => {
      if (player.name === ply.name) {
        newList.splice(idx, 1)
      }
    })
    setBList(newList)
  }

  useEffect(() => {
    var newVal = 0;
    if (bList) {
      bList.forEach((player) => {
        newVal+= props.calculateOverall(player)
      })
      setTotalValue((newVal).toFixed(2))
      props.setTeamBOverall((newVal).toFixed(2))
    }
  })

  return(
    <div className="team-b">
      <div className="teams">Team B</div>
      <div className="heavy">Total : {totalValue}</div>
      <SearchBarB bList={bList} addBList={addBList} playerList={props.playerList}/>
      <label className="heavy">Traded Players</label><div>
        {bList !== undefined && bList.map((player, idx) => (
            <ListNameB key={idx} deleteBList={deleteBList} player={player}/>
        ))}
      </div>
    </div>
  )
}

export default TeamB;