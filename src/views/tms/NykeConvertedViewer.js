import React from 'react';
import {Toolbar} from '../../components/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {CreateUserDialog,UpdateUserDialog} from '../../components/dialogs';
import {getRTVview} from '../../store/tms_converter/tms_converter.slice';
import {downloadBase64File} from '../../helpers/buttons'
//import {getUser} from '../../store/administration-user/user.slice';

const NykeConvertedViewer = ({routes}) => {
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
			Header:'ID',
			accessor:'id',
			// width:280,
			// Cell:props => {
			// 	const onClick = () => {
			// 		// console.log('selectedUser_before',selectedUser.user_email)
			// 		setSelectedUser({
			// 			...selectedUser,
			// 			user_email:props.value})
			// 		toggleUpdateDialog()
			// 	}
			// 	return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={onClick} >{props.value}</Typography>)
			// }
		},
		{
			Header:'Role',
			accessor:'role_name'
		},
	// eslint-disable-next-line react-hooks/exhaustive-deps
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getRTVview({
			route		:	'',
			page		:	pageIndex,
			totalPage	:	pageSize,
			orderBy		:	'createdAt,DESC',
			filters		:	filters
		}))
		.unwrap()
		.then(result => {
			//console.log(callBack(result))
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
				label='Nyke Converter Viewer'
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

export default NykeConvertedViewer;