import React from 'react';

export const Header = (props) => {
  return (
    <div>
      <h1>{props.appName}</h1>
      <h3>{props.appTask}</h3>
    </div>
  );
};

Header.defaultProps = {
  appName: "React App",
  appTask: "eee"
};