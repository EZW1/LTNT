import React from 'react';

const LoginContainer = props => (
  <div className="friendUnit">
    <div className="friendLabel">
      <p>{props.name}</p>
    </div>
    <div className="timeLeftLabel">
      <p>{props.timeLeft}</p>
    </div>
    <div className="settingBtn">
     <button>:</button>
    </div>
  </div>
);

export default LoginContainer;