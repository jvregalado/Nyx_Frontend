import React from 'react';
import {Routes,Route,useNavigate,Navigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {Login} from './views';
import {Container} from './layout';

function App() {

	const navigate = useNavigate();
	const {user_email} = useSelector(state => state.auth)

	React.useEffect(() => {
		if(user_email === '') {
			navigate('/login')
		}
	},[user_email, navigate])

	// console.log('user_email', typeof(user_email), {"user_email" : user_email})
	return (
		<div>
			<Routes>
				<Route exact path="/login" element={user_email === '' ? <Login/> : <Navigate to='/'/>} />
				<Route path='*' element={user_email === '' ? <Login/> : <Container/>}/>
			</Routes>
			<ToastContainer/>
		</div>
	);
}

export default App;