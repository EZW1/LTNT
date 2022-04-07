import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AddFriendPopup = props => {
  const [frequency, setFrequency] = React.useState('');

  const handleChange = (event) => {
    setFrequency(event.target.value);
  };


  return (
  <Paper elevation={3} className="add-friend-popup">
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
      <div className="x-button-container">
        <div className="x-button">
          <IconButton aria-label="close" onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="updateNameBtnContainer">
        {/* <input type="text" name="friendName" className="edit-friend-input" placeholder="Name" /> */}
        <TextField id="editNameField" label="Name" variant="outlined" />
        <div className="edit-period-btn-ctn">
          <Button variant="contained" onClick={() => {
              props.editFriendName(
                {
                  friends: props.friends,
                  friendId: props.friendId,
                  ssid: props.ssid,
                  newName: document.querySelector('#editNameField').value,
                }
              );
              props.handleClose();
              }}> Edit Name
          </Button>
        </div>
      </div>
    </Stack>
  </Paper>
)};

export default AddFriendPopup;