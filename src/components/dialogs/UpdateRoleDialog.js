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
import {Switch} from '../inputs';
import {getRoleDetails,patchRole} from '../../store/administration-role';

const UpdateRoleDialog = ({
	isOpen,
	toggle,
	role_code
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isNameError		:false,
		role_id			:'',
		role_code		:'',
		role_name		:'',
		role_status		:false,
		role_remarks1	:''
	});

	const handleUpdate = () => {
		let hasCode = false
		if(state.role_name===''){
			hasCode = true
		}
		setState({
			...state,
			isNameError:hasCode
		})

		if(!hasCode){
			dispatch(patchRole({
				route:'',
				data:{
					role_id			:state.role_id,
					role_code		:state.role_code,
					role_name		:state.role_name,
					role_status		:state.role_status,
					role_remarks1	:state.role_remarks1
				}
			}))

			setState({
				...state,
				isNameError		:false,
				role_code		:'',
				role_name		:'',
				role_status		:false,
				role_remarks1	:''
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
		// console.log('role_code',role_code)

		if(role_code !== null && role_code !== 'unknown role code') {
			dispatch(getRoleDetails({
				route	: 'details',
				filters	: {role_code}
			}))
			.unwrap()
			.then(result => {
				setState({
					...state,
					...result.data[0]
				})
			})
			// console.log('state',state)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[role_code]);

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update Role</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='role'/>
				<Grid container spacing={2}>
					<Grid item container>
						<Grid item md={10} xs={12}>
							<TextField
								disabled
								fullWidth
								name='role_code'
								variant='outlined'
								label='Role Code'
								defaultValue={role_code || ''}
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<Switch isLabelVisible label='Status' name='role_status' checked={state.role_status} handleChange={(e)=>setState({...state, role_status:e.target.checked})}/>
						</Grid>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='role_name'
							error={state.isNameError}
							variant='outlined'
							label='Role Name'
							value={state.role_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='role_remarks1'
							variant='outlined'
							label='Remarks'
							value={state.role_remarks1}
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

UpdateRoleDialog.defaultProps = {
	isOpen		: false,
	toggle		: false,
	role_code	:'unknown role code'
}

export default UpdateRoleDialog;