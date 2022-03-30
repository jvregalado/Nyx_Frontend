import React from 'react';
import {Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	DialogActions} from '@mui/material';
import {MasterSelect} from '../select';
import {useDispatch} from 'react-redux';
import {Spinner} from '..';
import {postModule} from '../../store/administration-module';


const CreateModuleDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isModuleError			:false,
		module_code				:'',
		module_name				:'',
		module_system_type		:'',
		module_desc				:'',
		module_remarks1			:''
	})

	const handleCreate = () => {
		let hasError = false
		if(state.module_code.replace(/ /g,'')==='' || state.module_name.replace(/ /g,'')===''){
			hasError = true;
		}

		setState({
			...state,
			isModuleError:hasError
		})

		if(!hasError){
			dispatch(postModule({
				route:'',
				data:{
					module_code			:state.module_code.replace(/\s\s+/g,' ').trim(),
					module_name			:state.module_name.replace(/\s\s+/g,' ').trim(),
					module_system_type	:state.module_system_type?.value,
					module_desc			:state.module_desc,
					module_remarks1		:state.module_remarks1
				}
			}))

			setState({
				...state,
				isModuleError		:false,
				module_code			:'',
				module_name			:'',
				module_system_type	:'',
				module_desc			:'',
				module_remarks1		:''
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
		<DialogTitle>Create Module</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='module'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='module_code'
							error={state.isModuleError}
							variant='outlined'
							label='Module Code'
							value={state.module_code}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
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
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Module System Type'
							name='module_system_type'
							label='Module System Type'
							route='reasoncode'
							type='Module System Type'
							value={state.module_system_type}
							handleChange={handleSelectChange}
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
			<Button variant='contained' onClick={handleCreate}>Save</Button>
		</DialogActions>
	</Dialog>
	);
}

export default CreateModuleDialog;