import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateModuleDialog,UpdateModuleDialog} from '../../components/dialogs';
import {getModule} from '../../store/administration-module';

const Modules = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [createTrigger,setCreateTrigger] = React.useState(false);
	const [updateTrigger,setUpdateTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.admin_module)
	const [createDialog,setCreateDialog] = React.useState(false);
	const [updateDialog,setUpdateDialog] = React.useState(false);
	const [selectedModule,setSelectedModule] = React.useState({module_email:null});

	const columns = React.useMemo(()=>[
		{
			Header:'Module Code',
			accessor:'module_code',
			width:170,
			Cell:props => {
				const onClick = () => {
					// console.log('selectedModule_before',selectedModule.module_email)
					setSelectedModule({
						...selectedModule,
						module_code:props.value})
					toggleUpdateDialog()
				}
				return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}}  onClick={onClick} >{props.value}</Typography>)
			}
		},
		{
			Header:'Module Name',
			accessor:'module_name',
			width:270
		},
		{
			Header:'Module System Type',
			accessor:'module_system_type_fk.rc_desc',
			width:150
		},
		{
			Header:'Module Description',
			accessor:'module_desc',
			width:200
		},
		{
			Header:'Status',
			accessor:'module_status',
			width:100,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'Module Remarks',
			accessor:'module_remarks1'
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
		dispatch(getModule({
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
			setSelectedModule({module_email:null})
		}
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Modules'
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
		<CreateModuleDialog isOpen={createDialog} toggle={()=>{ toggleCreateDialog() }}/>
		<UpdateModuleDialog isOpen={updateDialog} module_code={selectedModule.module_code} toggle={()=>{ toggleUpdateDialog() }}/>
	</Grid>
	)
}

export default Modules;