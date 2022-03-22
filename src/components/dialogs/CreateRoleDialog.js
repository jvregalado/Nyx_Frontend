import React from 'react';
import {Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	DialogActions} from '@mui/material';
import {useDispatch} from 'react-redux';
import {Spinner} from '..';
import {postRole} from '../../store/administration-role';

const CreateRoleDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isRoleError		:false,
		role_code		:'',
		role_name		:''
	})

	const handleCreate = () => {
		let hasCode = false
		if(state.role_code.replace(/ /g,'')==='' || state.role_name.replace(/ /g,'')===''){
			hasCode = true;
		}

		setState({
			...state,
			isRoleError:hasCode
		})

		if(!hasCode){
			dispatch(postRole({
				route:'',
				data:{
					role_code	:state.role_code.replace(/\s\s+/g,' ').trim(),
					role_name	:state.role_name.replace(/\s\s+/g,' ').trim(),
				}
			}))

			setState({
				...state,
				isRoleError	:false,
				role_code	:'',
				role_name	:''
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

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Create Role</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='role'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='role_code'
							error={state.isRoleError}
							variant='outlined'
							label='Role Code'
							value={state.role_code}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='role_name'
							error={state.isRoleError}
							variant='outlined'
							label='Role Name'
							value={state.role_name}
							onChange={handleChange}
						/>
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

export default CreateRoleDialog;