import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popup from 'reactjs-popup';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import EditPeriodPopup from './EditPeriodPopup.jsx';
import EditNamePopup from './EditNamePopup.jsx';

export default function ControlledAccordions(props) {
  
  const [expanded, setExpanded] = React.useState(false);
  const handleChange =
  (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const [openEN, setOpenEN] = React.useState(false);
  const handleCloseEN = () => {
    setOpenEN(false);
  };
  const handleToggleEN = () => {
    setOpenEN(!openEN);
  };

  const [openEP, setOpenEP] = React.useState(false);
  const handleCloseEP = () => {
    setOpenEP(false);
  };
  const handleToggleEP = () => {
    setOpenEP(!openEP);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '48%', flexShrink: 0 }}>
            {props.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{props.timeLeft}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion-details"> 
            <div className="accordion-log">
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </div>
            <div className="more-options">
              
                
                <Popup trigger={<Tooltip title="More Options">
                                  <IconButton aria-label="options">
                                    <MoreVertIcon />
                                  </IconButton>
                                </Tooltip>} position="right top" id="more-option-container"> 
                  <div className="options-popup">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <div className="deleteBtnContainer">
                        <IconButton aria-label="delete" onClick={() => props.deleteFriend({
                            friends: props.friends,
                            friendId: props.friendId,
                            ssid: props.ssid,
                            })}>
                          <DeleteIcon />
                        </IconButton>
                      </div>


                      <IconButton aria-label="editName" onClick={handleToggleEN}>
                        <EditIcon />
                      </IconButton>
                      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openEN}
                        >
                        <EditNamePopup handleClose={handleCloseEN} friendId={props.friendId} ssid={props.ssid} friends={props.friends} editFriend={props.editFriendName} />
                      </Backdrop>

                      {/* <div className="updateNameBtnContainer">
                        <input type="text" name="friendName" className="edit-friend-input" placeholder="Name" />
                        <button onClick={() => props.editFriendName({
                          friends: props.friends,
                          friendId: props.friendId,
                          ssid: props.ssid,
                          newName: document.querySelector('input.edit-friend-input').value,
                          })}>Edit Name</button>
                      </div> */}

                      <IconButton aria-label="editPeriod" onClick={handleToggleEP}>
                        <AccessTimeIcon />
                      </IconButton>
                      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openEP}
                        >
                        <EditPeriodPopup handleClose={handleCloseEP} friendId={props.friendId} ssid={props.ssid} friends={props.friends} editFriend={props.editFriend} />
                      </Backdrop>
                    </Stack>

                  </div>

                </Popup>
                
            </div>
          </div>


        </AccordionDetails>
      </Accordion>
    </div>
  );
}