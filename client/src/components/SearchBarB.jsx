import React, { useState, useEffect } from 'react';

function SearchBarB(props) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (player) => {
    if (props.bList.includes(player)) {
      alert(`${player.name} is already in this trade`)
    } else {
      props.addBList(player)
    }
  }

  const results = !searchTerm
  ? props.playerList
  : props.playerList.filter(player =>
      (player.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) && (player.firstName[0].toLowerCase() === searchTerm[0].toLocaleLowerCase() || player.lastName[0].toLowerCase() === searchTerm[0].toLocaleLowerCase()))
    );

  return(
    <div className="searchBar">
      <label className="search-label" htmlFor="search-inputB">Search</label>
      <input type="text" id="search-inputB" value={searchTerm} onChange={handleChange} size="20"></input>
      {searchTerm !== "" &&
        results.slice(0,3).map((result, idx) => (
          result !== undefined && <div className="search-name" key={idx}>
            <span onClick={()=> { handleClick(result) }}>{result.name || []}</span>
          </div>
        ))
      }
    </div>
  )
}

export default SearchBarB;