import React from 'react';

const LoginContainer = props => (
  <div className="inner-container">
    <div className="header">
      Login
    </div>
    <div className="box">
      <div className="input-group">
        <label htmlFor="username"></label>
        <input type="text" name="username" className="login-input" placeholder="Username" />
      </div>
      <div className="input-group">
        <label htmlFor="password"></label>
        <input type="password" name="password" className="login-input" placeholder="Password" />
      </div>
      <button type="button" className="login-btn" onClick={() => {
        props.submitLogin(
          {
            username: document.querySelector('div.input-group input[name=\'username\']').value, 
            password: document.querySelector('div.input-group input[name=\'password\']').value
          }
        )}}>
      Login
      </button>
    </div>
  </div>
);

export default LoginContainer;