import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/homeActions.js';
import FriendRow from '../components/FriendRow.jsx';

const mapStateToProps = ({ login, home }) => ({
  ssid: login.ssid,
  friends: home.friends,
});

const mapDispatchToProps = dispatch => ({
  syncFriends: (friends) => dispatch(actions.syncFriends(friends)) 
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
    friendsArray.push(<FriendRow name={friend.name} />)
  })

  return (
  <>
  
  <div className='contacts'>
    Friends
    <div>
      <button>Add a friend</button>
    </div>
    
    {friendsArray}
  </div>
  
  </>
)};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);