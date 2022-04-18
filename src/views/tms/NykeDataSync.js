import React from 'react';
import Spinner from '../../components/spinner/spinner'
import {Toolbar} from '../../components/toolbar';
import {Grid,Paper,Typography} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import {Input,DatePicker} from '../../components/inputs'
import {MasterSelect} from '../../components/select'
import {getReportCodes,getReport} from '../../store/wms_reporthub/wms_reporthub.slice';

const NykeReporthub = ({routes}) => {
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
		//console.log(state)
		dispatch(getReport({
			route:'reporthub',
			data:{
				...state
			}
		}))
	}

	React.useEffect(() => {
		if(state.report !== '' && state.report !== null) {
			dispatch(getReportCodes({
				route:'reporthub',
				data:{
				}
			}))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[state.report])

	return (
	<Grid container rowSpacing={1}>
		<Spinner loading={loading}/>
		<Grid item md={12}>
			<Toolbar
				label='Nyke Report Hub'
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
						label='Server to Sync'
						placeholder='Target Server to Sync'
						name='report'
						route='administration'
						type='report'
						module_code='tms data sync'
						value={state.report}
						handleChange={handleSelectChange}
					/>
				</Grid>
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

export default NykeReporthub;