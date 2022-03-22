import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateReportDialog,UpdateReportDialog} from '../../components/dialogs';
import {getReport} from '../../store/administration-report';

const Reports = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [createTrigger,setCreateTrigger] = React.useState(false);
	const [updateTrigger,setUpdateTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.admin_report)
	const [createDialog,setCreateDialog] = React.useState(false);
	const [updateDialog,setUpdateDialog] = React.useState(false);
	const [selectedReport,setSelectedReport] = React.useState({report_email:null});

	const columns = React.useMemo(()=>[
		{
			Header:'Report Code',
			accessor:'report_code',
			width:170,
			Cell:props => {
				const onClick = () => {
					// console.log('selectedReport_before',selectedReport.report_email)
					setSelectedReport({
						...selectedReport,
						report_code:props.value})
					toggleUpdateDialog()
				}
				return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}}  onClick={onClick} >{props.value}</Typography>)
			}
		},
		{
			Header:'Access Weight',
			accessor:'report_min_access_wt',
			width:80
		},
		{
			Header:'Report Name',
			accessor:'report_name',
			width:270
		},
		{
			Header:'Module Name',
			accessor:'module_name'
		},
		{
			Header:'Report System Type',
			accessor:'report_system_type_fk.rc_desc',
			width:200
		},
		{
			Header:'Report Type',
			accessor:'report_type_fk.rc_desc'
		},
		{
			Header:'Report Description',
			accessor:'report_desc'
		},
		{
			Header:'Status',
			accessor:'report_status',
			width:100,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'Report Remarks',
			accessor:'report_remarks1'
		},
		{
			Header:'Created Date',
			accessor:'createdAt'
		},
		{
			Header:'Created By',
			accessor:'creator.user_email'
		},
		{
			Header:'Updated Date',
			accessor:'updatedAt'
		},
		{
			Header:'Updated By',
			accessor:'modifier.user_email'
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getReport({
			route		:	'',
			page		:	pageIndex,
			totalPage	:	pageSize,
			orderBy		:	'createdAt,DESC',
			filters		:	filters
		}))
		.unwrap()
		.then(result => {
			callBack(result)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[createTrigger,updateTrigger])

	const toggleCreateDialog = () => {
		setCreateDialog(!createDialog)

		if(createDialog===true){
			setCreateTrigger(!createTrigger)
		}
	}

	const toggleUpdateDialog = () => {
		setUpdateDialog(!updateDialog)

		if(updateDialog===true){
			setUpdateTrigger(!updateTrigger)
			setSelectedReport({report_email:null})
		}
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Reports'
				isCreate
				onCreate={toggleCreateDialog}
			/>
		</Grid>
		<Grid item md={12}>
			<Grid container component={Paper} variant='container'>
				<Table
					loading={loading}
					columns={columns}
					fetchData={fetchData}
				/>
			</Grid>
		</Grid>
		<CreateReportDialog isOpen={createDialog} toggle={()=>{ toggleCreateDialog() }}/>
		<UpdateReportDialog isOpen={updateDialog} report_code={selectedReport.report_code} toggle={()=>{ toggleUpdateDialog() }}/>
	</Grid>
	)
}

export default Reports;