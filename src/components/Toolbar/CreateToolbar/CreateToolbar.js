import React from 'react';
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';
// import useStyles from './styles';

function CreateToolbar({
    title,
    onCancel,
    onConfirm,
    isConfirm,
    isNew,
    onSave,
    onNew,
    onAuthorize,
    onAmend,
    isAuthorize,
    isCancel,
    isSave,
    isAmend
}) {
    return (
        <Paper elevation={0} variant='outlined'> 
            <MUIToolbar>
                <div style={{flexGrow: 1}}>
                    <Typography variant='h6'>{title}</Typography>
                </div>
                <div>
                    <Button 
                        sx={{display: isCancel ? 'visible' :'none'}} 
                        variant='contained' 
                        color='secondary'  
                        onClick={onCancel}>
                            Back
                    </Button>
                    <Button 
                        sx={{display: isNew ? 'visible' :'none'}}  
                        variant='kerry'
                        onClick={onNew}>
                        New
                    </Button>
                    <Button 
                        sx={{display: isSave ? 'visible' :'none'}} 
                        variant='kerry' 
                        onClick={onSave}>
                            Save
                    </Button>
                    <Button 
                        sx={{display: isConfirm ? 'visible' :'none'}} 
                        variant='kerry'     
                        onClick={onConfirm}>
                            Confirm
                    </Button>
                </div>
            </MUIToolbar>
        </Paper>
    );
}

CreateToolbar.defaultProps = {
    onCancel:   ()=>{},
    onConfirm:  ()=>{},
    onSave:     ()=>{},
    onAuthorize:()=>{},
    onAmend:    ()=>{},
    onNew:      ()=>{},
    isAuthorize:false,
    isNew:      false,
    isCancel:   false,
    isConfirm:  false,
    isSave:     false,
    isAmend:    false
    
}


export default CreateToolbar;