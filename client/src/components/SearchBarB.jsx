import React, { useState, useEffect } from 'react';

function SearchBarB(props) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);

    // console.log(results)
  };

  const handleClick = (player) => {
    if (props.bList.includes(player)) {
      alert(`${player.name} is already in this trade`)
    } else {
      var playerSelect = confirm(`Are you sure you want to add ${player.name} to the trade?`)
      if (playerSelect) {
        alert(`${player.name} was added to the trade`)
        props.addBList(player)
      }
    }
  }

  const results = !searchTerm
  ? props.playerList
  : props.playerList.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  return(
    <div className="searchBar">
      <input type="text" value={searchTerm} onChange={handleChange} size="10"></input>
      {searchTerm !== "" &&

        results.slice(0,3).map((result, idx) => (
          result !== undefined && <div key={idx}>
            <span onClick={()=> { handleClick(result) }}>{result.name || []}</span>
          </div>
        ))
      }
    </div>
  )
}

export default SearchBarB;