import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {useNavigate,useMatch} from 'react-router-dom';
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateUserDialog} from '../../components/dialogs';
import {getUser} from '../../store/user/user.slice';

const Users = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [trigger,setTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.user)
	const navigate = useNavigate();
	const [createDialog,setCreateDialog] = React.useState(false);
	const url = useMatch('/administration/user');

	const columns = React.useMemo(()=>[
		{
			Header:'Email Address',
			accessor:'user_email',
			width:300,
			Cell:props => {
				const onClick = () => {
					// console.log('clicked', props.value)
					navigate({
						pathname:`${url.pathname}/details`,
						search:`user_email=${props.value}`
					})
				}
				return (<Typography onClick={onClick}>{props.value}</Typography>)
			}
		},
		{
			Header:'Role',
			accessor:'role_id'
		},
		{
			Header:'Status',
			accessor:'user_status',
			width:100,
			Cell:props => {
				return props.value ? 'Active' : 'Inactive'
			}
		},
		{
			Header:'First Name',
			accessor:'user_first_name'
		},
		{
			Header:'Middle Name',
			accessor:'user_middle_name',
			width:100
		},
		{
			Header:'Last Name',
			accessor:'user_last_name'
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
			accessor:'createdBy'
		},
		{
			Header:'Updated Date',
			accessor:'updatedAt'
		},
		{
			Header:'Updated By',
			accessor:'UpdateBy'
		}
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getUser({
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
	},[trigger])

	const toggleCreateDialog = () => {
		setCreateDialog(!createDialog)

		if(createDialog===true){
			setTrigger(!trigger)
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
		<CreateUserDialog isOpen={createDialog} toggle={
			()=>{
				toggleCreateDialog()
			}}/>
	</Grid>
	)
}

export default Users;