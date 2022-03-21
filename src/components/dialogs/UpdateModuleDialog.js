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
import {getModuleDetails,updateModule} from '../../store/administration-module';

const UpdateModuleDialog = ({
	isOpen,
	toggle,
	module_code
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isModuleError		:false,
		module_code			:'',
		module_name			:'',
		module_system_type	:'',
		module_type			:'',
		module_desc			:'',
		module_min_access_wt:0,
		module_status		:'',
		module_remarks1		:''
	});

	const handleUpdate = () => {
		let hasError = false
		if(state.module_name==='' || state.module_desc===''){
			hasError = true
		}
		setState({
			...state,
			isNameError:hasError
		})

		if(!hasError){
			dispatch(updateModule({
				route:'update',
				data:{
					module_id			:state.module_id,
					module_code			:state.module_code.replace(/\s\s+/g,' ').trim(),
					module_name			:state.module_name.replace(/\s\s+/g,' ').trim(),
					module_desc			:state.module_desc,
					module_status		:state.module_status,
					module_remarks1		:state.module_remarks1
				}
			}))

			setState({
				...state,
				isModuleError		:false,
				module_code			:'',
				module_name			:'',
				module_desc			:'',
				module_remarks1		:'',
				module_status		:''
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
		// console.log('module_code',module_code)

		if(module_code) {
			dispatch(getModuleDetails({
				route	: 'details',
				filters	: {module_code}
			}))
			.unwrap()
			.then(result => {
				setState({
					...state,
					...result.data[0]
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[module_code]);

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update Module</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='module'/>
				<Grid container spacing={2}>
					<Grid item container>
						<Grid item md={10} xs={10}>
							<TextField
								disabled
								fullWidth
								name='module_code'
								variant='outlined'
								label='Module Code'
								defaultValue={module_code || ''}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item md={2} xs={2}>
							<Switch isLabelVisible label='Status' name='module_status' checked={state.module_status} handleChange={(e)=>setState({...state, module_status:e.target.checked})}/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='module_name'
							error={state.isModuleError}
							variant='outlined'
							label='Module Name'
							value={state.module_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='module_desc'
							variant='outlined'
							label='Module Description'
							value={state.module_desc}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='module_remarks1'
							variant='outlined'
							label='Module Remarks'
							value={state.module_remarks1}
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

UpdateModuleDialog.defaultProps = {
	isOpen		: false,
	toggle		: false,
	module_code	:'unknown module code'
}

export default UpdateModuleDialog;