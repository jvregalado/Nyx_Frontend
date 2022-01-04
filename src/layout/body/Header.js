import React from 'react';

import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid,Menu,MenuItem} from '@mui/material'
import {useNavigate} from "react-router-dom"

const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const Header = () => {

const headerName = localStorage.getItem('keyvalue');
const hdrChk = localStorage.getItem('hdrChk');
if(headerName===null||headerName=="null")
{
  localStorage.setItem('keyvalue',"Conversion Tool");
}
  if(hdrChk!==headerName){
    localStorage.setItem('hdrChk',headerName);
    window.location.reload(false);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    const v = e.currentTarget.getAttribute('value');
    const kv = e.currentTarget.getAttribute('keyvalue');
    localStorage.setItem('keyvalue',kv)
    navigate(v);
    setAnchorEl(null);
  };
    return (
    <Grid item md={12} sx={{ flexGrow: 1 }}>
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
        onClose={handleClose}
      >
        
  {userDetails.userAdmin?
  <><MenuItem onClick={handleClose} value="/" keyvalue="Create Account">Create Account (Admin)</MenuItem>
  <MenuItem onClick={handleClose} value="/" keyvalue="Reset Password">Reset Password (Admin)</MenuItem></>:null}
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
