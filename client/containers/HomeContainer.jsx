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
});

const mapDispatchToProps = dispatch => ({
  syncFriends: (friends) => dispatch(actions.syncFriends(friends)),
  addFriend: (friend) => dispatch(actions.addFriend(friend)),
});

const HomeContainer = props => {
  useEffect(() => {
    axios.get('/showFriends', {
      params: {
        id: props.ssid
      }
    })
      .then(resp => {
        props.syncFriends(resp.data)
      })
    }, [])
  
  const friendsArray = [];
  // console.log('props.friends', props.friends)
  props.friends.map(friend => {
    friendsArray.push(<FriendRow name={friend.name} timeLeft={friend.followUp} />)
  })

  return (
  <>
  
  <div className='contacts'>
    Friends
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