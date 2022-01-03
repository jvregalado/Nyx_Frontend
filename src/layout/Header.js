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

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    const v = e.currentTarget.getAttribute('value');
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
        <MenuItem onClick={handleClose} value="Create Account">Create Account</MenuItem>
        <MenuItem onClick={handleClose} value="/">Conversion Tool</MenuItem>
        <MenuItem onClick={handleClose} value="/login">Logout</MenuItem>
      </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Conversion Tool
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
    )
}

export default Header
