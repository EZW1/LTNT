import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import * as actions from '../actions/homeActions.js';
import FriendRow from '../components/FriendRow.jsx';
import AddFriendPopup from '../components/AddFriendPopup.jsx';
import FriendAccordion from '../components/FriendAccordion.jsx';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Portal from '@mui/material/Portal';
import Box from '@mui/material/Box';

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
    friendsArray.push(<FriendAccordion 
      key={friend._id} 
      ssid={props.ssid} 
      friendId={friend._id} 
      name={friend.name} 
      timeLeft={friend.timeLeft} 
      deleteFriend={props.deleteFriend} 
      editFriend={props.editFriend} 
      editFriendName={props.editFriendName} 
      friends={props.friends} />)


    // friendsArray.push(<FriendRow 
    //   key={friend._id} 
    //   ssid={props.ssid} 
    //   friendId={friend._id} 
    //   name={friend.name} 
    //   timeLeft={friend.timeLeft} 
    //   deleteFriend={props.deleteFriend} 
    //   editFriend={props.editFriend} 
    //   editFriendName={props.editFriendName} 
    //   friends={props.friends} />)
    })

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
  <Container>
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
      <header>
        Welcome back, {props.name}!
      </header>
      <div className="addPerson">


        <Button variant="outlined" onClick={handleToggle}> Add a friend</Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
          >
          <AddFriendPopup handleClose={handleClose} friends={props.friends} id={props.ssid} addFriend={props.addFriend} />
        </Backdrop>
        
        {/* <Popup trigger={<Button variant="outlined"> Add a friend</Button>} position="right center"> 
        </Popup> */}
      </div>
      {friendsArray}
    </Stack>

  </Container>
)};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);