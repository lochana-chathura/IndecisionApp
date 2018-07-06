import React from 'react';

export const Option = (props) => {
    return (
      <div>
        {props.opt}
        <button onClick={(e) => { props.handleDeleteOption(props.opt) }}>Remove</button>
      </div>
    );
  };