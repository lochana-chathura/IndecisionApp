import React from 'react';

export const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <h1 className="header__title">{props.appName}</h1>
        {props.appTask && <h3 className="header__subtitle">{props.appTask}</h3>}
      </div>
    </div>
  );
};

Header.defaultProps = {
  appName: "React App",
  appTask: "eee"
};