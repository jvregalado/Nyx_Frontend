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
import {postReport} from '../../store/administration-report';
import {MasterSelect} from '../../components/select';

const CreateReportDialog = ({
	isOpen,
	toggle
}) => {

	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		isReportError			:false,
		report_code				:'',
		report_name				:'',
		module					:'',
		report_type				:'',
		report_desc				:'',
		report_min_access_wt	:0,
		report_remarks1			:''
	})

	const handleCreate = () => {
		let hasCode = false
		if(state.report_code.replace(/ /g,'')==='' || state.report_name.replace(/ /g,'')===''){
			hasCode = true;
		}

		setState({
			...state,
			isReportError:hasCode
		})

		if(!hasCode){
			dispatch(postReport({
				route:'',
				data:{
					report_code			:state.report_code.replace(/\s\s+/g,' ').trim(),
					report_name			:state.report_name.replace(/\s\s+/g,' ').trim(),
					module_id			:state.module?.value,
					report_type			:state.report_type?.value,
					report_desc			:state.report_desc,
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
				report_remarks1		:''
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
		<DialogTitle>Create Report</DialogTitle>
		<DialogContent dividers>
			<div>
				<Spinner reducer='report'/>
				<Grid container spacing={2}>
					<Grid item container>
						<TextField
							required
							fullWidth
							name='report_code'
							error={state.isReportError}
							variant='outlined'
							label='Report Code'
							value={state.report_code}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item container>
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
							label='Module'
							placeholder='Module'
							name='module'
							route='administration'
							type='module'
							value={state.module || ''}
							handleChange={handleSelectChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<MasterSelect
							fullWidth
							label='Report Type'
							placeholder='Report Type'
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
			<Button variant='contained' onClick={handleCreate}>Save</Button>
		</DialogActions>
	</Dialog>
	);
}

export default CreateReportDialog;