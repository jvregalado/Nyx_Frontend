import React from 'react';
import {Toolbar} from '../../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch,useSelector} from 'react-redux';
import {MasterSelect} from '../../../components/select'
// import {getUser} from '../../store/user/user.slice';

const ReportHub_wms = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const {loading} = useSelector(state => state.reporthub_wms)
	const [state,setState] = React.useState({
		whseLocation:null,
		principal	:null,
		dateFrom	:null,
		dateTo		:null,
		status		:false
	})

	const handleSelectChange = (e,name) => {
		setState({
			...state,
			[name]:e
		})
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='WMS Report Hub'
				// isCreate
				// onCreate={toggleCreateDialog}
			/>
		</Grid>
		<Grid item md={6}>
			<Grid container component={Paper} variant='container'>
				<MasterSelect
					label='Warehouse Location'
					name='whseLocation'
					systemType='wms'
					type='whseLocation'
					value={state.whseLocation}
					handleChange={handleSelectChange}
				/>
				Other filters goes here..
			</Grid>
		</Grid>
		<Grid item md={6}>
			<Grid container component={Paper} variant='container' onClick={() => {
				console.log(state)
			}}>
				upload file goes here
			</Grid>
		</Grid>
	</Grid>
	)
}

export default ReportHub_wms;