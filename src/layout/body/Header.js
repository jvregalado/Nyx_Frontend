import React from 'react';

import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Grid,
  Menu,
  MenuItem,
Dialog,
DialogTitle,
DialogContent,
DialogContentText,
TextField,
DialogActions,
Button,
Slide} from '@mui/material'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import Axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

Axios.defaults.withCredentials = true;

let URL;

if(process.env.NODE_ENV === 'development'){
    URL = process.env.REACT_APP_API_DEV
}
else {
    URL = process.env.REACT_APP_API
}
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const Header = () => {
  
// to change directory
  let navigate = useNavigate();


  //events
  //To Reset
  const toResetPassword = () =>{
    Axios.post(`${URL}users/login/resetpassword/`,{
      email_add: email,
      id: userDetails.id
  }).then((res)=>{
    resetDialogClose();
      return toast.success(`Email ${email} password has been reset.`);
  }).catch((e)=>{
      return toast.error(`${e.response.data.message}`);
  }
  );
  }
  //Reset Password Dialog Box
  const [email, setEmail] = React.useState(null);
  const [resetting, setResetting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpenResetting = () => {
    const em = email;
    if(em==="null"||em===null||em==="")
    {
      setResetting(false);
      return toast.error("Email cannot be empty.")
    }
    setResetting(true);
  };
  const resetDialogOpen = () => {
    setOpen(true);
    setResetting(false);
    setEmail(null);
  };
  const resetDialogClose = () => {
    setResetting(false);
    setOpen(false);
    setEmail(null);
  };
  const resetPasswordTextChange = (e)=>{
    setEmail(e.target.value);
    setResetting(false);
  }
  //Menu Bar Event
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOut = (e) => {
    setAnchorEl(null);
  };
  const handleClose = (e) => {
    const v = e.currentTarget.getAttribute('value');
    const kv = e.currentTarget.getAttribute('keyvalue');
    localStorage.setItem('keyvalue',kv)
    navigate(v);
    setAnchorEl(null);
  };

  //headerName Checker
const hdrChk = localStorage.getItem('hdrChk');
const headerName = localStorage.getItem('keyvalue');
if(headerName===null||headerName=="null")
{
  localStorage.setItem('keyvalue',"Conversion Tool");
}
  if(hdrChk!==headerName){
    localStorage.setItem('hdrChk',headerName);
    window.location.reload(false);
  }
    return (
      
    <Grid item md={12} sx={{ flexGrow: 1 }}>
      
      <Dialog open={open} onClose={resetDialogClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={resetPasswordTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialogClose}>Cancel</Button>
          <Button onClick={handleOpenResetting} disabled={resetting}>Reset</Button>
        </DialogActions>
          {resetting?<>
          <br/>
          <br/>
        <DialogContent>
        <DialogContentText classes="title">
       Are you sure you want to reset the password of {email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>{
    setResetting(false);
          }}>No</Button>
          <Button onClick={toResetPassword}>Yes</Button>
        </DialogActions>
        </>:null}
      </Dialog>
     
      <AppBar position="static">
        <Toolbar>
          
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeOut}
        onMouseLeave={closeOut}
      >
        
  {userDetails.userAdmin?
  <><MenuItem onClick={handleClose} value="/" keyvalue="Create Account">Create Account (Admin)</MenuItem>
  <MenuItem onClick={resetDialogOpen} value="/" keyvalue="Reset Password">Reset Password (Admin)</MenuItem>
  </>:null}
        <MenuItem onClick={handleClose} value="/" keyvalue="Change Password">Change Password</MenuItem>
        <MenuItem onClick={handleClose} value="/" keyvalue="Conversion Tool">Conversion Tool</MenuItem>
        <MenuItem onClick={handleClose} value="/login">Logout</MenuItem>
      </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
    
    )
}

export default Header
