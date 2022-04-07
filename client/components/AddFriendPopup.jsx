import React from 'react';

const AddFriendPopup = props => (
  <div className="inner-container">
    <div className="header">
      
    </div>
    <div className="box">
      <div className="input-group">
        <label htmlFor="username"></label>
        <input type="text" name="friendName" className="login-input" placeholder="Name" />
      </div>
      <div className="input-group">
        <select name="frequency" id="frequency">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="bimonthly">Bi-Monthly</option>
          <option value="quarterannually">Quarter-Anually</option>
          <option value="semiannually">Semi-Anually</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <button type="button" className="login-btn" onClick={() => {
        props.addFriend(
          {
            name: document.querySelector('div.input-group input[name=\'friendName\']').value, 
            frequency: document.querySelector('div.input-group select').value,
            id: props.id,
            friends: props.friends
          }
        )}}>
      Add
      </button>
    </div>
  </div>
);

export default AddFriendPopup;