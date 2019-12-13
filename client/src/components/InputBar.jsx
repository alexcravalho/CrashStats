import React, { useState } from 'react';

const InputBar = (props) => {

  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setText(event.target.value);
    var obj = props.obj;
    obj[props.num] = event.target.value;
    if (obj[props.num] === '') { delete obj[props.num] }
    props.setWeightObj(obj)
  };

  return(
    <div className="input-bar">
      <label>{props.text}</label><input type="text" value={text} onChange={handleChange}></input>
    </div>
  )
}

export default InputBar;