import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBarA from './SearchBarA.jsx';
import ListNameA from './ListNameA.jsx';

function TeamA(props) {

  const [aList, setAList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const addAList = (player) => {
    var newList = aList.slice()
    newList.push(player)
    setAList(newList)
  }

  const deleteAList = (player) => {
    var newList = aList.slice();
    aList.forEach((ply, idx) => {
      if (player.name === ply.name) {
        newList.splice(idx, 1)
      }
    })
    setAList(newList)
  }

  useEffect(() => {
    var newVal = 0;
    if (aList) {
      aList.forEach((player) => {
        newVal+= props.calculateOverall(player)
      })
      setTotalValue((newVal).toFixed(2))
      props.setTeamAOverall((newVal).toFixed(2))
    }
  })

  return(
    <div className="team-a">
      <div className="teams">Team A</div>
      <div className="heavy">Total : {totalValue}</div>
      <SearchBarA aList={aList} addAList={addAList} playerList={props.playerList}/>
      <label className="heavy">Traded Players</label><div>
        {aList !== undefined && aList.map((player, idx) => (
            <ListNameA key={idx} deleteAList={deleteAList} player={player}/>
        ))}
      </div>
    </div>
  )
}

export default TeamA;
