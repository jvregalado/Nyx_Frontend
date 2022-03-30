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
import {getReasonCodeDetails,patchReasonCode} from '../../store/administration-reasoncode/reasoncode.slice';


const UpdateReasonCodeDialog = ({
	isOpen,
	toggle,
	rc_id
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isReasonCodeError	:false,
		rc_id				:'',
		rc_type				:'',
		rc_code				:'',
		rc_desc				:'',
		rc_remarks1			:'',
		rc_status			:false
	});

	const handleUpdate = () => {
		let hasError = false
		if(state.rc_code==='' || state.rc_type==='' || state.rc_type===''){
			hasError = true
		}
		setState({
			...state,
			isReasonCodeError:hasError
		})

		if(!hasError){
			dispatch(patchReasonCode({
				route:'',
				data:{
					rc_id		:state.rc_id,
					rc_type		:state.rc_type,
					rc_code		:state.rc_code,
					rc_desc		:state.rc_desc,
					rc_remarks1	:state.rc_remarks1,
					rc_status	:state.rc_status
				}
			}))

			setState({
				...state,
				isReasonCodeError	:false,
				rc_id				: '',
				rc_type				: '',
				rc_code				: '',
				rc_desc				: '',
				rc_remarks1			: '',
				rc_status			: false
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
		// console.log('rc_id',rc_id)

		if(rc_id !== null && rc_id !== 'unknown reason code id') {
			dispatch(getReasonCodeDetails({
				route	: 'details',
				filters	: {rc_id}
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
	},[rc_id]);

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update Reason Code</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='reasoncode'/>
				<Grid container spacing={2}>
					<Grid item container>
						<Grid item md={10} xs={12}>
							<TextField
								disabled
								fullWidth
								name='rc_type'
								variant='outlined'
								label='Reason Type'
								value={state.rc_type}
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<Switch isLabelVisible label='Status' name='rc_status' checked={state.rc_status} handleChange={(e)=>setState({...state, rc_status:e.target.checked})}/>
						</Grid>
					</Grid>
					<Grid item container>
						<TextField
							disabled
							fullWidth
							name='rc_code'
							variant='outlined'
							label='Reason Code'
							value={state.rc_code}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='rc_desc'
							error={state.isReasonCodeError}
							variant='outlined'
							label='Reason Code Description'
							value={state.rc_desc}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='rc_remarks1'
							variant='outlined'
							label='Remarks'
							value={state.rc_remarks1}
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

UpdateReasonCodeDialog.defaultProps = {
	isOpen		: false,
	toggle		: false,
	rc_id		: 'unknown reason code id'
}

export default UpdateReasonCodeDialog;