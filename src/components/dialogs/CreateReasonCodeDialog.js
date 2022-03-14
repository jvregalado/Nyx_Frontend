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
import {createReasonCode} from '../../store/administration-reasoncode';
import {MasterSelect} from '../select';

const CreateReasonCodeDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isReasonCodeError	:false,
		rc_type				:'',
		rc_code				:'',
		rc_desc				:'',
		rc_remarks1			:''
	})

	const handleCreate = () => {
		let hasReasonCode = false;
		if(state.rc_type.replace(/ /g,'')==='' || state.rc_code.replace(/ /g,'')==='' || state.rc_desc.replace(/ /g,'')===''){
			hasReasonCode = true;
		}

		setState({
			...state,
			isReasonCodeError:hasReasonCode
		})

		if(!hasReasonCode){
			dispatch(createReasonCode({
				route:'create',
				data:{
					rc_type		:state.rc_type,
					rc_code		:state.rc_code,
					rc_desc		:state.rc_desc,
					rc_remarks1	:state.rc_remarks1
				}
			}))

			setState({
				...state,
				isReasonCodeError	:false,
				rc_type				:'',
				rc_code				:'',
				rc_desc				:'',
				rc_remarks1			:''
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
		<DialogTitle>Create Reason Code</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='rc'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='rc_type'
							error={state.isReasonCodeError}
							variant='outlined'
							label='Reason code Type'
							value={state.rc_type}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='rc_code'
							error={state.isReasonCodeError}
							variant='outlined'
							label='Reason Code'
							value={state.rc_code}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='rc_desc'
							error={state.isReasonCodeError}
							variant='outlined'
							label='Reason code Description'
							value={state.rc_desc}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='rc_remarks1'
							variant='outlined'
							label='Reason code Remarks'
							value={state.rc_remarks1}
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

export default CreateReasonCodeDialog;