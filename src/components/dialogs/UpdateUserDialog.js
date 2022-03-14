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
import {Switch} from '../../components/inputs';
import {getUserDetails,updateUser} from '../../store/administration-user';
import {MasterSelect} from '../../components/select';


const UpdateUserDialog = ({
	isOpen,
	toggle,
	user_email
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isNameError		:false,
		user_first_name :'',
		user_middle_name:'',
		user_last_name	:'',
		user_contact_no	:'',
		user_status		:false,
		role			:null
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
			dispatch(updateUser({
				route:'update',
				data:{
					user_id			:state.user_id,
					user_email		:state.user_email,
					user_first_name	:state.user_first_name,
					user_middle_name:state.user_middle_name,
					user_last_name	:state.user_last_name,
					user_contact_no	:state.user_contact_no,
					user_status		:state.user_status,
					role_id			:state.role?.value
				}
			}))

			setState({
				...state,
				isNameError		:false,
				user_email		:'',
				user_first_name :'',
				user_middle_name:'',
				user_last_name	:'',
				user_contact_no	:'',
				user_status		:false,
				role			:''
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

	const handleSelectChange = (e,name) => {
		setState({
			...state,
			[name]:e
		})
	}

	React.useEffect(()=>{
		// console.log('user_email',user_email)

		if(user_email) {
			dispatch(getUserDetails({
				route	: 'details',
				filters	: {user_email}
			}))
			.unwrap()
			.then(result => {
				setState({
					...state,
					...result.data[0],
					role:{
						value	:result.data[0].role?.role_id,
						label	:result.data[0].role?.role_name
					}
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[user_email]);

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update User</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='user'/>
				<Grid container spacing={2}>
					<Grid item container>
						<Grid item md={10} xs={12}>
							<TextField
								disabled
								fullWidth
								name='user_email'
								variant='outlined'
								label='Email Address'
								defaultValue={user_email || ''}
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<Switch isLabelVisible label='Status' name='user_status' checked={state.user_status} handleChange={(e)=>setState({...state, user_status:e.target.checked})}/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Role Name'
							name='role'
							systemType='admin'
							type='role'
							value={state.role}
							handleChange={handleSelectChange}
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
							value={state.user_first_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='user_middle_name'
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
							error={state.isNameError}
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
							variant='outlined'
							label='Contact No.'
							value={state.user_contact_no}
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

UpdateUserDialog.defaultProps = {
	isOpen		: false,
	toggle		: false,
	user_email	:'unknown email address'
}

export default UpdateUserDialog;