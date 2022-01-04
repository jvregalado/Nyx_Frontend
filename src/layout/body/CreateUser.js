import React from 'react';
import {Grid, 
    Paper,
    Avatar,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
    Dialog} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CreateUser=()=>{
    const [state,setState] = React.useState({
        txtUsername:'',
        txtFirstName:'',
        txtSuffix:'',
        txtLastName:'',
        chbAdmin:false,
        txtContact:''
    })

const userDetails = JSON.parse(localStorage.getItem('userDetails'));

Axios.defaults.withCredentials = true;

let URL;

if(process.env.NODE_ENV === 'development'){
    URL = process.env.REACT_APP_API_DEV
}
else {
    URL = process.env.REACT_APP_API
}
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    const u = state.txtUsername;
    const f = state.txtFirstName;
    const l = state.txtLastName;
    if(u===""||f===""||l===""){
        return toast.error(`Please check for the required fields`);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const ClickCreateUser=()=>{
    setOpen(false);
    try{
    Axios.post(`${URL}users/login/createuser/`,{
        email_add: state.txtUsername,
        first_name:state.txtFirstName,
        suffix: state.txtSuffix,
        last_name: state.txtLastName,
        createdBy: userDetails.id ,
        userAdmin: state.chbAdmin,
        contactNo: state.txtContact
    }).then((res)=>{
        return toast.success(`Email ${state.txtUsername} has been successfully created.`);
    }).catch((e)=>{
        return toast.error(`${e.response.data.message}`);
    }
    );}
    catch(e){
        
        return toast.error(`${e.response.data.message}`);
    }  
}

const paperStyle={ padding: 20, height:'70vh', width:280,margin:"20px auto"};
const avatarStyle={backgroundColor:"#e0732f"};
    return(
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
                <Avatar style={avatarStyle}><AddIcon/></Avatar>
            </Grid>
            <br/>
            <br/>
            <TextField 
                id="txtUsername" 
                label="Email Address" 
                placeholder="Enter Email Address" 
                variant="standard" 
                fullWidth required
                onChange={(e)=>{
                    setState({
                        ...state,
                        txtUsername:e.target.value
                    })
                }}/>
            <TextField 
                id="txtFirstName" 
                label="First Name" 
                placeholder="Enter First Name" 
                variant="standard" 
                onChange={(e)=>{
                    setState({
                        ...state,
                        txtFirstName:e.target.value
                    })
                }}
                fullWidth required/>
                <TextField 
                    id="txtSuffix" 
                    label="Suffix" 
                    placeholder="Enter Suffix" 
                    variant="standard" 
                    onChange={(e)=>{
                        setState({
                            ...state,
                            txtSuffix:e.target.value
                        })
                    }}
                    fullWidth />
                    <TextField 
                        id="txtLastName" 
                        label="Last Name" 
                        placeholder="Enter Last Name" 
                        variant="standard" 
                        onChange={(e)=>{
                            setState({
                                ...state,
                                txtLastName:e.target.value
                            })
                        }}
                        fullWidth 
                        required/>
                    <TextField 
                        id="txtContact" 
                        label="Contact" 
                        placeholder="Enter Contact Number" 
                        variant="standard" 
                        fullWidth 
                    onChange={(e)=>{
                        setState({
                            ...state,
                            txtContact:e.target.value
                        })
                    }}/>
                        <FormControlLabel
        control={
          <Checkbox
            name="chbAdmin"
            color="primary" 
          />
        }
        label="Admin"  
            
        onChange={(e)=>{
            //console.log(e.target.checked)
            setState({
                ...state,
                chbAdmin:e.target.checked
            })
        }}
      />
                        <br/>
                        <br/>
                        <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained" 
                        fullWidth
                        onClick={handleClickOpen}>Create Account</Button>
                        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Creating User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to add {state.txtUsername}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={ClickCreateUser}>Agree</Button>
        </DialogActions>
      </Dialog>
                        
            </Paper>
        </Grid>
    )
}

export default CreateUser