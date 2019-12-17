import React, { useState } from 'react';

const ListNameB = (props) => {

  const [xbox, setXbox] = useState(false);
  const handleDelete = (player) => {
    props.deleteBList(props.player);
    setXbox(false);
  }

  return(
  <div className="player-name" onMouseEnter={() => { setXbox(true) }} onMouseLeave={() => { setXbox(false) }}>
    {xbox && <div className="x" onClick={() => { handleDelete(props.player) }}>X</div>}
    <div className="player-name-text" >{props.player.name}</div>
  </div>
  )
};

export default ListNameB;