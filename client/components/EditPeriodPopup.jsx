import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
      <div className="editPeriod">
        <div className="input-group">
          <Box sx={{ minWidth: 210 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={frequency}
                label="Frequency"
                onChange={handleChange}
              >
                <MenuItem value={'daily'}>Daily</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
                <MenuItem value={"biweekly"}>Bi-Weekly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
                <MenuItem value={"bimonthly"}>Bi-Monthly</MenuItem>
                <MenuItem value={"quarterannually"}>Quarter-Anually</MenuItem>
                <MenuItem value={"semiannually"}>Semi-Anually</MenuItem>
                <MenuItem value={"yearly"}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="edit-period-btn-ctn">
            <Button variant="contained" onClick={() => {
                props.editFriend(
                  {
                    frequency: document.querySelector('div.editPeriod select').value,
                    friendId: props.friendId,
                    ssid: props.ssid,
                    friends: props.friends
                  }
                );
                document.querySelector('#outlined-basic').value = ""
                setFrequency("")
                props.handleClose();
                }}> Edit Period
            </Button>
          </div>
        </div>
      </div>
    </Stack>
  </Paper>
)};

export default AddFriendPopup;