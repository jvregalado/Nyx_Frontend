import React from 'react';
import {Routes,Route,useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';

import { ToastContainer} from 'react-toastify';

import { Login } from './views';
import { Container } from './layout';
// import {Body} from './layout/body';

function App() {

  const navigate = useNavigate();

  const {email} = useSelector(state => state.auth)

  React.useEffect(() => {
    if(email === ''){
      navigate('/login')
    }
  },[email, navigate])

  // console.log('email', typeof(email), {"email" : email})

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='*' element={<Container/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;