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
import {Spinner} from '..';
import {changePassword} from '../../store/authentication/authentication.thunk';


const ChangePasswordDialog = ({
	user_email,
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		user_email			:user_email || '',
		user_old_password	:'',
		user_new_password1	:'',
		user_new_password2	:'',
		hasError			:false
	})

	const handleUpdate = () => {
		let isError = false

		if(state.user_new_password1 !== state.user_new_password2){
			isError = true
		}

		setState({
			...state,
			hasError:isError
		})

		if(isError === false && state.user_new_password1.length > 6){
			dispatch(changePassword({
				route:'password_change',
				data:{
					user_email			:state.user_email,
					user_old_password	:state.user_old_password,
					user_new_password	:state.user_new_password1
				}
			}))

			setState({
				...state,
				user_old_password	:'',
				user_new_password1	:'',
				user_new_password2	:'',
				hasError			:false
			})
			toggle();
		}
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e
		})
	}

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Change Password</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='changePassword'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							type={'password'}
							name='user_old_password'
							variant='outlined'
							label='Old Password'
							value={state.user_old_password}
							onChange={handleChange}
							error={state.hasError}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							type={'password'}
							name='user_new_password1'
							variant='outlined'
							label='New Password'
							value={state.user_new_password1}
							onChange={handleChange}
							error={state.hasError}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							type={'password'}
							name='user_new_password2'
							variant='outlined'
							label='Retype New Password'
							value={state.user_new_password2}
							onChange={handleChange}
							error={state.hasError}
						/>
					</Grid>
					<Grid>
						<Typography variant='caption'>*NOTE: minimum of 6 characters</Typography>
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

export default ChangePasswordDialog;