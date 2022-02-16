import React from 'react';
import {Menu, 
    MenuItem,
} from '@mui/material';
import {signOut} from '../../store/authentication/authentication.slice'
import {useDispatch} from 'react-redux';

function UserMenu({anchorEl,open,handleClose}) {
    const [openModal,setModal] = React.useState(false);
    
    const dispatch = useDispatch();
    const toggle=()=>{
        setModal(!openModal);
    }

    const handleSignOut =() => {
        dispatch(signOut())
    }
    
    return (
        <div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={()=>{toggle() 
                handleClose()
                }}>Update Account</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenu;