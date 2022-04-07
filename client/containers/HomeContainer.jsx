import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import * as actions from '../actions/homeActions.js';
import FriendRow from '../components/FriendRow.jsx';
import AddFriendPopup from '../components/AddFriendPopup.jsx';

const mapStateToProps = ({ login, home }) => ({
  ssid: login.ssid,
  friends: home.friends,
  name: login.name,
});

const mapDispatchToProps = dispatch => ({
  syncFriends: (friends) => dispatch(actions.syncFriends(friends)),
  syncName: (name) => dispatch(actions.syncName(name)),
  addFriend: (friend) => dispatch(actions.addFriend(friend)),
  deleteFriend: (friend) => dispatch(actions.deleteFriend(friend)),
  editFriend: (friend) => dispatch(actions.editFriend(friend)),
  editFriendName: (friend) => dispatch(actions.editFriendName(friend)),
});

const HomeContainer = props => {
  useEffect(() => {
    axios.get('/showFriends', {params: {id: props.ssid}})
      .then(resp => {
        props.syncFriends(resp.data.friends)
        console.log(resp.data.name);
        props.syncName(resp.data.name)
      })
    }, [])
  
  const friendsArray = [];
  props.friends.map(friend => {
    friendsArray.push(<FriendRow 
      key={friend._id} 
      ssid={props.ssid} 
      friendId={friend._id} 
      name={friend.name} 
      timeLeft={friend.timeLeft} 
      deleteFriend={props.deleteFriend} 
      editFriend={props.editFriend} 
      editFriendName={props.editFriendName} 
      friends={props.friends} />)
  })

  return (
  <>
  
  <div className='contacts'>
    Welcome back, {props.name}!
    <div>
      <Popup trigger={<button> Add a friend</button>} position="right center"> 
        <AddFriendPopup friends={props.friends} id={props.ssid} addFriend={props.addFriend} />
      </Popup>
    </div>
    {friendsArray}
  </div>
  
  </>
)};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);