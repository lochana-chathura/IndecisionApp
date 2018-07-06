import React from 'react';
import {Option} from './Option';

export const Options = (props) => {
    return (
      <div>
        Options
    <button disabled={!props.options.length > 0} onClick={props.removeAll} >Remove All</button>
        {props.options.map((option) => <Option key={option} opt={option} handleDeleteOption={props.handleDeleteOption} />)}
      </div>
    );
  };