import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBarA from './SearchBarA.jsx';

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

  const handleDelete = (player) => {
    var playerSelect = confirm(`Are you sure you want to remove ${player.name} to the trade?`)
    if (playerSelect) {
      alert(`${player.name} was removed from the trade`)
      deleteAList(player)
    }
  }

  useEffect(() => {
    var newVal = 0;
    if (aList) {
      aList.forEach((player) => {
        newVal+= props.calculateOverall(player)
      })
      setTotalValue((newVal).toFixed(2))
    }
  })

  return(
    <div className="team-a">
      <div>Team A</div>
      <div className="heavy">Total : {totalValue}</div>
      <SearchBarA aList={aList} addAList={addAList} playerList={props.playerList}/>
      <label className="heavy">Traded Players</label><div>
        {aList !== undefined && aList.map((player, idx) => (
          <div key={idx} onClick={() => { handleDelete(player) } }>{player.name}</div>
        ))}
      </div>
    </div>
  )
}

export default TeamA;