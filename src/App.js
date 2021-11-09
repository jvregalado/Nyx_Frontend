//import logo from './logo.svg';
import './App.css';
import {Grid} from '@mui/material';
import {Content,Header} from './layout';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Header/>
      </Grid>
      <Grid item md={12}>
        <Content/>
      </Grid>
      <ToastContainer/>
    </Grid>
  );
}

export default App;
