
import Header from './Header';
import Content from './Content';
import CreateUser from './CreateUser';
import {Grid} from '@mui/material';
import {Navigate,Route,Routes} from "react-router-dom"

const Body = () => {
  const token = localStorage.getItem('token');
  const headerName = localStorage.getItem('keyvalue');
  const isLogin = false;
  if(token == null || token == "" || token=='undefined') { 
    return (
      
      <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  } 
  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Header/>
      </Grid>
      <Grid item md={12}>
        {(headerName==="Conversion Tool")?<Content/>:
        (headerName==="Create Account")?<CreateUser/>:
        null}
      </Grid>
    </Grid>
        )
    }
    
    export default Body