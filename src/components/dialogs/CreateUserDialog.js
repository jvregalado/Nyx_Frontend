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
import {createUser} from '../../store/administration-user';
import {MasterSelect} from '../../components/select';

const CreateUserDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isEmailError	:false,
		isNameError		:false,
		user_email		:'',
		user_first_name :'',
		user_middle_name:'',
		user_last_name	:'',
		user_contact_no	:'',
		role			:null,
		whLocation		:null,
		position		:null,
		user_rank		:0
	})

	const handleCreate = () => {
		let hasEmail = false;
		let hasName = false
		if(state.user_email.replace(/ /g,'')==='' || !state.user_email.includes('@')){
			hasEmail = true;
		}
		if(state.user_first_name===''){
			hasName = true
		}

		setState({
			...state,
			isEmailError:hasEmail,
			isNameError:hasName
		})

		if(!hasEmail && !hasName){
			dispatch(createUser({
				route:'create',
				data:{
					user_email		:state.user_email.replace(/ /g,'').toLowerCase(),
					user_first_name	:state.user_first_name,
					user_middle_name:state.user_middle_name,
					user_last_name	:state.user_last_name,
					user_contact_no	:state.user_contact_no,
					role_id			:state.role?.value,
					user_whLocation	:state.whLocation?.value,
					user_position	:state.position?.value,
					user_rank		:state.user_rank
				}
			}))

			setState({
				...state,
				isEmailError	:false,
				isNameError		:false,
				user_email		:'',
				user_first_name :'',
				user_middle_name:'',
				user_last_name	:'',
				user_contact_no	:'',
				role			:null,
				whLocation		:null,
				position		:null,
				user_rank		:0
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
							error={state.isEmailError}
							variant='outlined'
							label='Email Address'
							value={state.user_email}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Role Name'
							label='Role'
							name='role'
							route='administration'
							type='role'
							value={state.role}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Position'
							label='Job Position'
							name='position'
							route='reasoncode'
							type='Job Position'
							value={state.position}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Warehouse Location Assignment'
							label='Warehouse Assignment'
							name='whLocation'
							route='reasoncode'
							type='Warehouse Location'
							value={state.whLocation}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							type='number'
							name='user_rank'
							variant='outlined'
							label='User Rank'
							value={state.user_rank}
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
					<Grid>
						<Typography variant='caption'>*NOTE: default password is kerrylogistikus</Typography>
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