import React from 'react';
import Spinner from '../../components/spinner'
import {Toolbar} from '../../components/toolbar';
import {Grid,Paper,Typography} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import {Input,DatePicker} from '../../components/inputs'
import {MasterSelect} from '../../components/select'
import {getReport} from '../../store/wms_reporthub';


const KairosReporthub = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {

	const {loading} = useSelector(state => state.wms_reporthub)
	const dispatch = useDispatch();
	const [state,setState] = React.useState({
		module		:'',
		report		:'',
		whseLocation:'',
		principal	:'',
		dateFrom	:'',
		dateTo		:'',
		status		:false,
		refDoc1		:'',
		refDoc2		:'',
		refDoc3		:'',
		refDoc4		:''
	})

	const handleSelectChange = (e,name) => {
		setState({
			...state,
			[name]:e
		})
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	const handleExcel = () => {
		console.log(state)
		dispatch(getReport({
			route:'reporthub',
			data:{
				...state
			}
		}))
	}

	// React.useEffect(() => {
	// 	if(state.report !== '' && state.report !== null) {
	// 		dispatch(getReportCodes({
	// 			route:'reporthub',
	// 			data:{
	// 			}
	// 		}))
	// 	}
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// },[state.report])

	return (
	<Grid container rowSpacing={1}>
		<Spinner loading={loading}/>
		<Grid item md={12}>
			<Toolbar
				label='Kairos Report Hub'
				isDownloadExcel={true}
				onDownloadExcel={handleExcel}
				isDownloadPdf={true}
			/>
		</Grid>
		<Grid item md={5}>
			<Grid container component={Paper} variant='container'>
				<Grid item md={12}>
					<MasterSelect
						paddingLeft={1}
						paddingRight={1}
						fullWidth
						label='Report Name'
						placeholder='Report Name'
						name='report'
						route='administration'
						type='report'
						module_code='wms reporthub'
						value={state.report}
						handleChange={handleSelectChange}
					/>
				</Grid>
				<Input
					size={12}
					isLabelVisible={true}
					required
					fullWidth
					name='refDoc1'
					variant='outlined'
					label='Primary Ref Doc1'
					value={state.refDoc1}
					handleChange={handleChange}
				/>
				<Input
					size={12}
					isLabelVisible={true}
					required
					fullWidth
					name='refDoc2'
					variant='outlined'
					label='Primary Ref Doc2'
					value={state.refDoc2}
					handleChange={handleChange}
				/>
				<Input
					size={12}
					isLabelVisible={true}
					required
					fullWidth
					name='refDoc3'
					variant='outlined'
					label='Primary Ref Doc3'
					value={state.refDoc3}
					handleChange={handleChange}
				/>
				<Input
					size={12}
					isLabelVisible={true}
					required
					fullWidth
					name='refDoc4'
					variant='outlined'
					label='Primary Ref Doc4'
					value={state.refDoc4}
					handleChange={handleChange}
				/>
				<DatePicker
					size={6}
					isLabelVisible={true}
					label={'Date From'}
					name='date1'
					variant='outlined'
					value={state.dateFrom}
					handleChange={handleChange}
				/>
				<DatePicker
					size={6}
					isLabelVisible={true}
					label={'Date To'}
					name='date2'
					variant='outlined'
					value={state.dateTo}
					handleChange={handleChange}
				/>
			</Grid>
		</Grid>
		<Grid item md={7}>
			<Grid container component={Paper} variant='container'>
				upload file goes here
			</Grid>
		</Grid>
		<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("state",state)} >{'POKE ME'}</Typography>
	</Grid>
	)
}

export default KairosReporthub;