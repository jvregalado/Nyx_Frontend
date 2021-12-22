

import Header from './Header';
import Content from './Content';
import {Grid} from '@mui/material';
import {Navigate,Route,Routes} from "react-router-dom"

const body = () => {
  const token = localStorage.getItem('token');
  console.log(token)  
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
        <Content/>
      </Grid>
    </Grid>
        )
    }
    
    export default body