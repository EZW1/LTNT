import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const AddFriendPopup = props => {
  const [frequency, setFrequency] = React.useState('');

  const handleChange = (event) => {
    setFrequency(event.target.value);
  };


  return (
  <Paper elevation={3} className="add-friend-popup">
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
      
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        {/* <TextField className="input-group"> */}
          {/* <input type="text" name="friendName" className="add-friend-input" placeholder="Name of Friend" /> */}
        {/* </TextField> */}
        {/* <div className="input-group">
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
        </div> */}

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
        <div className="inline-popup-buttons">
          <div className="popup-back-button">
            <Button variant="outlined" onClick={() => {
              document.querySelector('#outlined-basic').value = ""
              setFrequency("")
              props.handleClose();
              }}>Back</Button>
          </div>
          <div className="popup-add-button">
            <Button variant="contained" onClick={() => {
              props.addFriend(
                {
                  name: document.querySelector('#outlined-basic').value, 
                  frequency,
                  id: props.id,
                  friends: props.friends
                }
              );
              document.querySelector('#outlined-basic').value = ""
              setFrequency("")
              props.handleClose();
              }}> Add
            </Button>
          </div>
        </div>
    </Stack>
  </Paper>
)};

export default AddFriendPopup;