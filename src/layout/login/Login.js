import React from 'react';
import {Grid, 
    Paper,
    Avatar,
    TextField,
    // Checkbox,
    // FormControlLabel,
    Button} 
from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import Axios from 'axios';
import { toast } from 'react-toastify';
import {Navigate,Route,Routes} from "react-router-dom"



const Login=()=>{
    localStorage.clear()
    const [email_add,setEmail_add]=React.useState("");
const [password,setPassword]=React.useState("");

const[loginStatus,setLoginStatus]=React.useState(false);

Axios.defaults.withCredentials = true;

let URL;

if(process.env.NODE_ENV === 'development'){
    URL = process.env.REACT_APP_API_DEV
}
else {
    URL = process.env.REACT_APP_API
}

const ToConversion = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>)
}

const auth = ()=>{
    Axios.get(`${URL}users/login/Authentication`,{
        headers:{
            "x-access-token":localStorage.getItem('token')
        }
    }).then((response)=>{
        console.log(response)
    })
}

const login = () =>{
    Axios.post(`${URL}users/login/`,{
        email_add: email_add,
        password: password
    }).then((res)=>{
        if(!res.data.auth){
            setLoginStatus(false);
            return toast.error('Incorrect email or password. ');
        }
        else{
            setLoginStatus(true);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('userDetails',JSON.stringify(res.data.user));
            console.log(res.data.user);
            localStorage.setItem('keyvalue',"Conversion Tool");
            localStorage.setItem('hdrChk',"Conversion Tool");
            //return toast.success('Successfully login. ');
        }
    }).catch((err)=>{
        setLoginStatus(false);
        console.log(err,"login")
        return toast.error('Incorrect email or password. ');
    }
    );    
};

const paperStyle={ padding: 20, height:'70vh', width:280,margin:"20px auto"};
const avatarStyle={backgroundColor:"#e0732f"};

return(
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                <h2>Sign in</h2>
            </Grid>
            <TextField 
                id="txtUsername" 
                label="Email Address" 
                placeholder="Enter Email Address" 
                variant="standard" 
                onChange={(e)=>{
                    setEmail_add(e.target.value)
                }}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                      login()
                    }
                  }}
                fullWidth required/>
            <TextField 
                id="txtPassword" 
                label="Password" 
                placeholder="Enter password" 
                variant="standard" 
                type="password" 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                      login()
                    }
                  }}
                fullWidth required/>
            {/* <FormControlLabel
        control={
          <Checkbox
            name="chbRemember"
            color="primary"
          />
        }
        label="Remember me"
      /> */}
      <br/>
      <br/>
      <Button type="submit" color="primary" variant="contained" onClick={login} fullWidth>Sign in</Button>
      {loginStatus?<ToConversion/>:null}
        </Paper>
    </Grid>
)
}

export default Login