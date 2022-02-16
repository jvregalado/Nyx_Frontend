import React from 'react';
import {AppBar,
    IconButton,
    Toolbar,
    Box,
    Button
} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import {useSelector} from 'react-redux'
import {Sidebar} from '../../layout'
import UserMenu from './userMenu';

function Header(props) {
    // const classes = useStyles();
    const {email} = useSelector(state => state.auth)
    const [isOpen,setDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const toggleDrawer = () => {
        setDrawer(!isOpen);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div >
            <AppBar variant='kerry' position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <div style={{width:'100%'}}>
                      <Box display='flex' justifyContent='flex-end'>
                        <Button sx={{
                            color:'#FF6400'
                        }} onClick={handleMenu}>
                          {email}
                          User
                        </Button>
                      </Box>
                  </div>
                </Toolbar>
            </AppBar>
            <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose}/>
            <Toolbar/>
            <Sidebar isOpen={isOpen} toggle={toggleDrawer}/>
        </div>
    );
}

export default Header;