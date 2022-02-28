import React from 'react';
import {Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	DialogActions} from '@mui/material';
import {useDispatch} from 'react-redux';
import {Spinner} from '../../components';
import {createUser,getUser} from '../../store/user';


const UpdateUserDialog = ({
	isOpen,
	toggle,
	user_email
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isNameError:false
	});

	const handleUpdate = () => {
		let hasName = false
		if(state.user_first_name===''){
			hasName = true
		}

		setState({
			...state,
			isNameError:hasName
		})

		if(!hasName){
			// dispatch(updateUser({
			// 	route:'update',
			// 	data:{
			// 		user_email		:state.user_email.replace(/ /g,''),
			// 		user_first_name	:state.user_first_name,
			// 		user_middle_name:state.user_middle_name,
			// 		user_last_name	:state.user_last_name,
			// 		user_contact_no	:state.user_contact_no
			// 	}
			// }))

			setState({
				...state,
				isNameError		:false,
				user_email		:'',
				user_first_name :'',
				user_middle_name:'',
				user_last_name	:'',
				user_contact_no	:''
			})
			toggle();
		}
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	React.useEffect(()=>{
		const fetchData = dispatch(getUser({
				route		:	'get',
				filters		:	{user_email:'dpmanalo@codedisruptors.com'}
			}))

		console.log('fetchData',fetchData)

	},[toggle])

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update User</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='user'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							disabled
							fullWidth
							name='user_email'
							variant='outlined'
							label='Email Address'
							value={''}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='user_first_name'
							error={state.isNameError}
							variant='outlined'
							label='First Name'
							value={''}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='user_middle_name'
							variant='outlined'
							label='Middle Name'
							value={''}
							onChange={handleChange}
						 />
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='user_last_name'
							error={state.isNameError}
							variant='outlined'
							label='Last Name'
							value={''}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='user_contact_no'
							error={state.isNameError}
							variant='outlined'
							label='Contact No.'
							value={''}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</div>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' onClick={toggle} color='secondary'>Cancel</Button>
			<Button variant='contained' onClick={handleUpdate}>Save</Button>
		 </DialogActions>
	 </Dialog>
	);
}

export default UpdateUserDialog;