//import logo from './logo.svg';
import './App.css';
import {Login} from './layout/login';
import {Body} from './layout';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Body/>}/>
      </Routes>
      <ToastContainer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
