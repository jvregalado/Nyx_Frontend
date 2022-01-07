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

const Header = () => {
  
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
// to change directory
  let navigate = useNavigate();


  //events
  //Change Password
  const toChangePassword = () =>{
    
    const old = passwordState.txtOldPassword;
    const newPass = passwordState.txtNewPassword;
    const conf = passwordState.txtConfirmPassword;
    if(newPass.length<8)
    return toast.error(`Password must be greater than 8 characters`);
    if(newPass!==conf)
    return toast.error(`Mismatched password`);
    else
    {
    Axios.post(`${URL}users/login/changepassword/`,{
      id: userDetails.id,
      oldPassword: old,
      newPassword: newPass
  }).then((res)=>{
      changeDialogClose();
      return toast.success(`Password has been changed!`);
  }).catch((e)=>{
      return toast.error(`${e.response.data.message}`);
  }
  );
  }
}
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


  //Change Password Dialog Box
  const [passwordState,setPasswordState] = React.useState({
    txtOldPassword:'',
    txtNewPassword:'',
    txtConfirmPassword:'',
})
  const [changePass, setChangePass] = React.useState(false);
  const changeDialogClose = () => {
    setChangePass(false);
    setPasswordState(
      {txtOldPassword:'',
    txtNewPassword:'',
    txtConfirmPassword:''}
    );
  };
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
      
      <Dialog open={changePass} onClose={changeDialogClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your desire password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="txtOldPass"
            label="Old Password"
            fullWidth
            variant="standard"
            type="password"
            onChange={(e)=>{
              setPasswordState({
                  ...passwordState,
                  txtOldPassword:e.target.value
              })
          }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="txtNewPass"
            label="New Password"
            fullWidth
            variant="standard"
            type="password"
            onChange={(e)=>{
              setPasswordState({
                  ...passwordState,
                  txtNewPassword:e.target.value
              })
          }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="txtConfirmPass"
            label="Confirm Password"
            fullWidth
            type="password"
            variant="standard"
            onChange={(e)=>{
              setPasswordState({
                  ...passwordState,
                  txtConfirmPassword:e.target.value
              })
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={changeDialogClose}>Cancel</Button>
          <Button onClick={toChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>
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
  <><MenuItem value="/" keyvalue="Create Account">Create Account (Admin)</MenuItem>
  <MenuItem onClick={resetDialogOpen} value="/" keyvalue="Reset Password">Reset Password (Admin)</MenuItem>
  </>:null}
        <MenuItem onClick={(e)=>{
    setChangePass(true)
}} value="/" >Change Password</MenuItem>
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
