import React, { useState } from 'react';

const InputBar = (props) => {

  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setText(event.target.value);
    // props.setWeightObj({props.num: event.target.value})
  };

  return(
    <div className="input-bar">
      <label>{props.text}</label><input type="text" value={text} onChange={handleChange}></input>
    </div>
  )
}

export default InputBar;