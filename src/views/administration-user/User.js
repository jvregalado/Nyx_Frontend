import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateUserDialog,UpdateUserDialog} from '../../components/dialogs';
import {getUser} from '../../store/administration-user';

const Users = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [createTrigger,setCreateTrigger] = React.useState(false);
	const [updateTrigger,setUpdateTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.admin_user)
	const [createDialog,setCreateDialog] = React.useState(false);
	const [updateDialog,setUpdateDialog] = React.useState(false);
	const [selectedUser,setSelectedUser] = React.useState({user_email:null});

	const columns = React.useMemo(()=>[
		{
			Header:'Email Address',
			accessor:'user_email',
			width:280,
			Cell:props => {
				const onClick = () => {
					// console.log('selectedUser_before',selectedUser.user_email)
					setSelectedUser({
						...selectedUser,
						user_email:props.value})
					toggleUpdateDialog()
				}
				return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={onClick} >{props.value}</Typography>)
			}
		},
		{
			Header:'Role',
			accessor:'role_name'
		},
		{
			Header:'Position',
			accessor:'user_position_fk.rc_desc'
		},
		{
			Header:'Warehouse Location',
			accessor:'user_whLocation_fk.rc_desc'
		},
		{
			Header:'Rank',
			accessor:'user_rank',
			width:80
		},
		{
			Header:'Status',
			accessor:'user_status',
			width:80,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'First Name',
			accessor:'user_first_name',
			width:130
		},
		{
			Header:'Middle Name',
			accessor:'user_middle_name',
			width:100
		},
		{
			Header:'Last Name',
			accessor:'user_last_name',
			width:130
		},
		{
			Header:'User Remarks',
			accessor:'user_remarks1'
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
		dispatch(getUser({
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
			setSelectedUser({user_email:null})
		}
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Users'
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
		<CreateUserDialog isOpen={createDialog} toggle={()=>{ toggleCreateDialog() }}/>
		<UpdateUserDialog isOpen={updateDialog} user_email={selectedUser.user_email} toggle={()=>{ toggleUpdateDialog() }}/>
	</Grid>
	)
}

export default Users;