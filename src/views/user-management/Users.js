import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Routes,Route,useNavigate,useMatch} from 'react-router-dom';
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateUserDialog} from '../../components/dialogs';

import {getUser} from '../../store/user';

// import {Button} from '../../components/buttons';
// import {DateFilter,SelectFilter} from '../../components/table/Filters';


const Users = ({routes}) => {
	// const {path} = useMatch();

	return (
		// <Routes>
			<View/>
		// </Routes>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const [trigger,setTrigger] = React.useState(false);
	const {loading} = useSelector(state => state.user)
	// const history = useNavigate();
	// const {url} = useMatch();
	const [createDialog,setCreateDialog] = React.useState(false);

	const columns = React.useMemo(()=>[
		{
			Header:'Email Address',
			accessor:'user_email',
			width:300,
			// Cell:props => {
			//	 const onClick = () => {
			//		 history.push({
			//			 pathname:`${url}/details`,
			//			 search:`draft_bill_no=${props.value}`
			//		 })
			//	 }
			//	 return (<Button label={props.value} onClick={onClick}/>)
			// }
		},
		{
			Header:'Role',
			accessor:'role_id'
		},
		{
			Header:'Status',
			accessor:'user_status'
		},
		{
			Header:'First Name',
			accessor:'user_first_name'
			//,Filter:props => <SelectFilter column={props.column} label='Category' variant='algo_type'/>
		},
		{
			Header:'Middle Name',
			accessor:'user_middle_name'
		},
		{
			Header:'Last Name',
			accessor:'user_last_name'
		},
		// {
		//	 Header:'RDD',
		//	 accessor:'delivery_date',
		//	 Filter:props=><DateFilter column={props.column} label='Delivery Date' name='delivery_date'/>
		//	 Filter:props=><DateRangeFilter column={props.column}/>
		// },
		// {
		//	 Header:'Customer',
		//	 accessor:'customer',
		//	 Filter:props=><MasterSelectFilter column={props.column} variant='principal' label='Principal' name='principal'/>
		// },
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

	// const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
	// 	dispatch(getUser({
	// 		route		:	'get',
	// 		page		:	pageIndex,
	// 		totalPage	:	pageSize,
	// 		orderBy		:	'createdAt, DESC',
	// 		filters		:	filters
	// 	}))
	// 	.unwrap()
	// 	.then(result => {
	// 		callBack(result)
	// 	})
	// },[trigger])

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
					// fetchData={fetchData}
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