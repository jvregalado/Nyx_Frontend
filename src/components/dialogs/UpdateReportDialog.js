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
import {getReportDetails,patchReport} from '../../store/administration-report';
import {MasterSelect} from '../select';

const UpdateReportDialog = ({
	isOpen,
	toggle,
	report_code
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isReportError		:false,
		report_code			:'',
		report_name			:'',
		module				:'',
		report_type			:'',
		report_desc			:'',
		report_min_access_wt:0,
		report_status		:false,
		report_remarks1		:''
	});

	const handleUpdate = () => {
		let hasError = false
		if(state.report_name==='' || state.report_desc===''){
			hasError = true
		}
		setState({
			...state,
			isNameError:hasError
		})

		if(!hasError){
			dispatch(patchReport({
				route:'',
				data:{
					report_id			:state.report_id,
					report_code			:state.report_code.replace(/\s\s+/g,' ').trim(),
					report_name			:state.report_name.replace(/\s\s+/g,' ').trim(),
					module_id			:state.module?.value,
					report_type			:state.report_type?.value,
					report_desc			:state.report_desc,
					report_status		:state.report_status,
					report_min_access_wt:state.report_min_access_wt,
					report_remarks1		:state.report_remarks1
				}
			}))

			setState({
				...state,
				isReportError		:false,
				report_code			:'',
				report_name			:'',
				module				:'',
				report_type			:'',
				report_desc			:'',
				report_min_access_wt:0,
				report_remarks1		:'',
				report_status		:false
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
		// console.log('report_code',report_code)

		if(report_code !== null && report_code !== 'unknown report code') {
			dispatch(getReportDetails({
				route	: 'details',
				filters	: {report_code}
			}))
			.unwrap()
			.then(result => {
				setState({
					...state,
					...result.data[0],
					module:{
						value	:result.data[0]?.report_module_fk?.module_id,
						label	:result.data[0]?.report_module_fk?.module_name
					},
					report_type:{
						value	:result.data[0]?.report_type_fk?.rc_id,
						label	:result.data[0]?.report_type_fk?.rc_desc
					}
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[report_code]);

	return (
		<Dialog open={isOpen}>
		<DialogTitle>Update Report</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='report'/>
				<Grid container spacing={2}>
					<Grid item container>
						<Grid item md={10} xs={12}>
							<TextField
								disabled
								fullWidth
								name='report_code'
								variant='outlined'
								label='Report Code'
								defaultValue={report_code || ''}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<Switch isLabelVisible label='Status' name='report_status' checked={state.report_status} handleChange={(e)=>setState({...state, report_status:e.target.checked})}/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='report_name'
							error={state.isReportError}
							variant='outlined'
							label='Report Name'
							value={state.report_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Module'
							name='module'
							label='Module'
							route='administration'
							type='module'
							value={state.module || ''}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							placeholder='Report Type'
							label='Report Type'
							name='report_type'
							route='reasoncode'
							type='Report Type'
							value={state.report_type}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='report_desc'
							variant='outlined'
							label='Report Description'
							value={state.report_desc}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='report_min_access_wt'
							variant='outlined'
							label='Report Minimum Access Weight'
							value={state.report_min_access_wt}
							onChange={handleChange}
							type='number'
						/>
					</Grid>
					<Grid item container>
						<TextField
							fullWidth
							name='report_remarks1'
							variant='outlined'
							label='Report Remarks'
							value={state.report_remarks1}
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

UpdateReportDialog.defaultProps = {
	isOpen		: false,
	toggle		: false,
	report_code	:'unknown report code'
}

export default UpdateReportDialog;