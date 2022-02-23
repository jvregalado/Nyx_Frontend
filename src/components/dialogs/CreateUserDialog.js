import React from 'react';
import {Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	Typography,
	DialogActions} from '@mui/material';
import {useDispatch} from 'react-redux';
import {Spinner} from '../../components';
import {createUser} from '../../store/user';

const CreateUserDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		emailIsError	:false,
		fnameIsError	:false,
		user_email		:'',
		user_first_name :'',
		user_middle_name:'',
		user_last_name	:'',
		user_contact_no	:''
	})

	const handleCreate = () => {
		let hasEmail = false;
		let hasName = false
		if(state.user_email===''){
			hasEmail = true;
		}
		if(state.user_first_name===''){
			hasName = true
		}

		setState({
			...state,
			emailIsError:hasEmail,
			nameIsError:hasName
		})

		if(!hasEmail && !hasName){
			dispatch(createUser({
				route:'create',
				data:{
					user_email		:state.user_email,
					user_first_name	:state.user_first_name,
					user_middle_name:state.user_middle_name,
					user_last_name	:state.user_last_name,
					user_contact_no	:state.user_contact_no
				}
			}))

			setState({
				...state,
				emailIsError	:false,
				fnameIsError	:false,
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
		if(state.user_email !== ''){
			setState({
				...state,
				emailIsError:false,
			})
		}
		if(state.user_first_name !== ''){
			setState({
				...state,
				nameIsError:false,
			})
		}
	},[state.name, state.email])

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Create User</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='user'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='user_email'
							error={state.emailIsError}
							variant='outlined'
							label='Email Address'
							value={state.user_email}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='user_first_name'
							error={state.nameIsError}
							variant='outlined'
							label='First Name'
							value={state.user_first_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='user_middle_name'
							error={state.nameIsError}
							variant='outlined'
							label='Middle Name'
							value={state.user_middle_name}
							onChange={handleChange}
						 />
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='user_last_name'
							error={state.nameIsError}
							variant='outlined'
							label='Last Name'
							value={state.user_last_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='user_contact_no'
							error={state.nameIsError}
							variant='outlined'
							label='Contact No.'
							value={state.user_contact_no}
							onChange={handleChange}
						/>
					</Grid>
					<Grid>
						<Typography variant='caption'>*NOTE: Password will be sent to the provided email</Typography>
					</Grid>
				</Grid>
			</div>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' onClick={toggle} color='secondary'>Cancel</Button>
			<Button variant='contained' onClick={handleCreate}>Save</Button>
		 </DialogActions>
	 </Dialog>
	);
}

export default CreateUserDialog;