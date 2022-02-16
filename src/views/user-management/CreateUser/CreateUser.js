import React from 'react';
import {Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Typography,
    DialogActions} from '@mui/material';

function CreateUser({
    isOpen,
    toggle
}) {
    const [state,setState] = React.useState({
        email:'',
        emailIsError:false,
        name:'',
        nameIsError:false,

    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleCreate = () => {

    }
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent  dividers>
                <div>
                <Grid container spacing={2}>
                     <Grid item container>
                         <TextField  
                             required
                             fullWidth
                             name='email'
                             error={state.emailIsError}
                             variant='outlined'
                             label='Email'
                             value={state.email}
                             onChange={handleChange}
                         />
                     </Grid>
                     <Grid item container>
                         <TextField  
                             required
                             fullWidth
                             name='name'
                             error={state.nameIsError}
                             variant='outlined'
                             label='Name'
                             value={state.name}
                             onChange={handleChange}
                         />
                     </Grid>
                     <Grid>
                         <Typography variant='caption'>*Password will be sent to the provided email</Typography>
                     </Grid>
                 </Grid>
                </div>
            </DialogContent>
            <DialogActions>
             <Button variant='contained' onClick={toggle} color='secondary'>Cancel</Button>
             <Button variant='contained' onClick={handleCreate}>Confrim</Button>
         </DialogActions>
        </Dialog>
    );
}

export default CreateUser;