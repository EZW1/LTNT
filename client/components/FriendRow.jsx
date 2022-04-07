import React from 'react';
import Popup from 'reactjs-popup';


const LoginContainer = props => (
  <div className="friendUnit">
    <div className="friendLabel">
      <p>{props.name}</p>
    </div>
    <div className="timeLeftLabel">
      <p>{props.timeLeft}</p>
    </div>
    <div className="settingBtn">
      <Popup trigger={<button>:</button>} position="right center"> 
        <div className="deleteBtnContainer">
          <button onClick={() => props.deleteFriend({
            friends: props.friends,
            friendId: props.friendId,
            ssid: props.ssid,
            })}>Delete Friend</button>
        </div>
        <div className="updateNameBtnContainer">
          <input type="text" name="friendName" className="edit-friend-input" placeholder="Name" />
          <button onClick={() => props.editFriendName({
            friends: props.friends,
            friendId: props.friendId,
            ssid: props.ssid,
            newName: document.querySelector('input.edit-friend-input').value,
            })}>Edit Name</button>
        </div>
        <div className="editPeriod">
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
            <button type="button" className="update-period" onClick={() => {props.editFriend(
              { 
                frequency: document.querySelector('div.editPeriod select').value,
                friendId: props.friendId,
                ssid: props.ssid,
                friends: props.friends
              }
            )}}>Edit Period</button>
          </div>
        </div>
      </Popup>
    </div>
  </div>
);

export default LoginContainer;