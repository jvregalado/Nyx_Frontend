import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateReasonCodeDialog,UpdateReasonCodeDialog} from '../../components/dialogs';
import {getReasonCode} from '../../store/administration-reasoncode';

const ReasonCode = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [createTrigger,setCreateTrigger] = React.useState(false);
	const [updateTrigger,setUpdateTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.admin_reasoncode)
	const [createDialog,setCreateDialog] = React.useState(false);
	const [updateDialog,setUpdateDialog] = React.useState(false);
	const [selectedReasonCode,setSelectedReasonCode] = React.useState({reasoncode_email:null});

	const columns = React.useMemo(()=>[
		{
			Header:'Reason ID',
			accessor:'rc_id',
			width:150,
			Cell:props => {
				const onClick = () => {
					setSelectedReasonCode({
						...selectedReasonCode,
						rc_id:props.value})
					toggleUpdateDialog()
				}
				return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={onClick} >{`Edit`}</Typography>)
			}
		},
		{
			Header:'Reason Type',
			accessor:'rc_type',
			width:150
		},
		{
			Header:'Reason Code',
			accessor:'rc_code'
		},
		{
			Header:'Reason Description',
			width:200,
			accessor:'rc_desc'
		},
		{
			Header:'Status',
			accessor:'rc_status',
			width:100,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'Remarks',
			accessor:'rc_remarks1'
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
		dispatch(getReasonCode({
			route		:	'',
			page		:	pageIndex,
			totalPage	:	pageSize,
			orderBy		:	'rc_type,DESC',
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
			setSelectedReasonCode({rc_type:null, rc_code:null})
		}
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Reason Codes'
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
		<CreateReasonCodeDialog isOpen={createDialog} toggle={()=>{ toggleCreateDialog() }}/>
		<UpdateReasonCodeDialog isOpen={updateDialog} rc_id={selectedReasonCode.rc_id} toggle={()=>{ toggleUpdateDialog() }}/>
	</Grid>
	)
}

export default ReasonCode;