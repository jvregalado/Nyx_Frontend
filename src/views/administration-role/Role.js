import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateRoleDialog,UpdateRoleDialog} from '../../components/dialogs';
import {getRole} from '../../store/administration-role';

const Role = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [trigger,setTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.role)
	const [createDialog,setCreateDialog] = React.useState(false);
	const [updateDialog,setUpdateDialog] = React.useState(false);
	const [selectedRole,setSelectedRole] = React.useState({role_code:null});

	const columns = React.useMemo(()=>[
		{
			Header:'Role Code',
			accessor:'role_code',
			Cell:props => {
				const onClick = () => {
					// console.log('selectedRole_before',selectedRole.role_code)
					setSelectedRole({
						...selectedRole,
						role_code:props.value})
					toggleUpdateDialog()
				}
				return (<Typography sx={{ color:'#CC6400' }} onClick={onClick} >{props.value}</Typography>)
			}
		},
		{
			Header:'Role Name',
			accessor:'role_name',
			width:300
		},
		{
			Header:'Status',
			accessor:'role_status',
			width:100,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'Role Remarks',
			accessor:'role_remarks1'
		},
		{
			Header:'Created Date',
			accessor:'createdAt'
		},
		{
			Header:'Created By',
			accessor:'createdBy'
		},
		{
			Header:'Updated Date',
			accessor:'updatedAt'
		},
		{
			Header:'Updated By',
			accessor:'updatedBy'
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getRole({
			route		:	'get',
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
	},[trigger])

	const toggleCreateDialog = () => {
		setCreateDialog(!createDialog)

		if(createDialog===true){
			setTrigger(!trigger)
		}
	}

	const toggleUpdateDialog = () => {
		setUpdateDialog(!updateDialog)
		
		if(updateDialog===true){
			setTrigger(!trigger)
			setSelectedRole({role_code:null})
		}
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Roles'
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
		<CreateRoleDialog isOpen={createDialog} toggle={()=>{ toggleCreateDialog() }}/>
		<UpdateRoleDialog isOpen={updateDialog} role_code={selectedRole.role_code} toggle={()=>{ toggleUpdateDialog() }}/>
	</Grid>
	)
}

export default Role;