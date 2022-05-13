/* eslint-disable dot-location */
/* eslint-disable no-useless-escape */
import React from 'react';
import moment from 'moment'
import Spinner from '../../components/spinner'
import {Toolbar} from '../../components/toolbar';
import {Grid,Paper
	,Typography
} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import {Table} from '../../components/table';
import {Input,DatePicker} from '../../components/inputs'
import {MasterSelect} from '../../components/select'
import {getReportCodes,postSync,getDataSyncLog} from '../../store/tms_datasync';

const NykeDatasync = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {

	const {loading} = useSelector(state => state.tms_datasync)
	const dispatch = useDispatch();
	const [state,setState] = React.useState({
		report		:''
	})
	const [trigger,setTrigger] = React.useState(false)

	const handleReportChange = (e,name) => {
		/**Reset the state if report dropdown is changed or cleared */
		setState({
			[name]:e
		})
		setTrigger(!trigger)
	}

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

	const handleDownloadExcel = () => {
		//console.log(state)
		// dispatch(getReport({
		// 	route:'datasync',
		// 	data:{
		// 		...state
		// 	}
		// }))
	}

	const handleDownloadPdf = () => {
		//console.log(state)
		// dispatch(getReport({
		// 	route:'datasync',
		// 	data:{
		// 		...state
		// 	}
		// }))
	}

	const handleSynchronize = () => {
		//console.log(state)
		dispatch(postSync({
			route:'datasync',
			data:{
				...state
			}
		})).then(x => {
			setTrigger(!trigger)
		})
	}

	const columns = React.useMemo(()=>[
		{
			Header:'Data Sync ID',
			accessor:'datasync_id',
			width:180
		},
		{
			Header:'Target Sync Code',
			accessor:'report_code'
		},
		{
			Header:'Created Date',
			accessor:'createdAt',
			width:100,
			Cell:props => {
				return props.value ? moment(props.value).format('YYYY-MM-DD HH:mm:ss') : ''
			}
		},
		{
			Header:'Created By',
			accessor:'creator.user_email'
		},
		{
			Header:'Updated Date',
			accessor:'updatedAt',
			width:100,
			Cell:props => {
				return props.value ? moment(props.value).format('YYYY-MM-DD HH:mm:ss') : ''
			}
		},
		{
			Header:'Updated By',
			accessor:'modifier.user_email'
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getDataSyncLog({
			route		:	'datasync',
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

	/**Fetching the source code on the report*/
	React.useEffect(() => {
		if(state.report !== '' && state.report !== null) {
			dispatch(getReportCodes({
				route:'datasync',
				report_id : state.report?.value
			}))
			.unwrap()
			.then(result => {
				/** Get the source code of the report (na string in json format) */
				let report_source_code = result?.data?.data[0]?.report_source_code || 'pamparampampam';

				/** Check if source code (na string) is JSON.parsable */
				if(/^[\],:{}\s]*$/.test(report_source_code.replace(/\\["\\\/bfnrtu]/g, '@').
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
						setState({
							...state,
							source_code : JSON.parse(report_source_code)
						})
					}
				else{
					setState({
						...state,
						source_code : {}
					})
				}
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[state.report])

	return (
	<Grid container rowSpacing={1}>
		<Spinner loading={loading}/>
		<Grid item md={12}>
			<Toolbar
				label='Nyke Data Sync'
				isDownloadExcel={state?.source_code?.buttons?.isDownloadExcel || false}
				onDownloadExcel={handleDownloadExcel}
				isDownloadPdf={state?.source_code?.buttons?.isDownloadPdf || false}
				onDownloadPdf={handleDownloadPdf}
				isSynchronize={state?.source_code?.buttons?.isSynchronize || false}
				onSynchronize={handleSynchronize}
			/>
		</Grid>
		<Grid item md={5} sx={{
			paddingTop:1
		}}>
			<Grid container component={Paper} variant='container'>
				<Grid item md={12}>
					<MasterSelect
						paddingLeft={1}
						paddingRight={1}
						fullWidth
						label='System and Server to Sync'
						placeholder='Target Data/Server'
						name='report'
						route='administration'
						type='report'
						module_code='tms datasync'
						value={state.report}
						handleChange={handleReportChange}
					/>
				</Grid>

				{/**Dynamically Generate Select Components */}
				{	typeof state?.source_code?.dropdowns === 'object' ?
					state?.source_code?.dropdowns.map((foo,i) => (
						<Grid item md={12}>
							<MasterSelect
								key={i}
								paddingLeft={1}
								paddingRight={1}
								fullWidth
								label={foo.label}
								placeholder={foo.placeholder}
								name={foo.name}
								route={foo.route}
								type={foo.type}
								module_code='tms datasync'
								value={state[foo.name]}
								handleChange={handleSelectChange}
							/>
						</Grid>
					)) : null
				}

				{/**Dynamically Generate Text Fields Components */}
				{	typeof state?.source_code?.textfields === 'object' ?
					state?.source_code?.textfields.map((foo,i) => (
						<Input
							key={i}
							fullWidth
							size={12}
							variant='outlined'
							isLabelVisible={true}
							label={foo.label}
							required={foo.isRequired}
							name={foo.name}
							value={state[foo.name]}
							handleChange={handleChange}
						/>
					)) : null
				}

				{/**Dynamically Generate Dates Components */}
				{	typeof state?.source_code?.datefields === 'object' ?
					state?.source_code?.datefields.map((foo,i) => (
						<DatePicker
							key={i}
							size={6}
							variant='outlined'
							isLabelVisible={true}
							label={foo.label}
							name={foo.name}
							value={state[foo.name]}
							handleChange={handleChange}
						/>
					)) : null
				}

			</Grid>
		</Grid>
		<Grid item md={7} sx={{
			paddingLeft:1
		}}>
			<Grid container component={Paper} variant='container'>
				Submodule details goes here...
			</Grid>
		</Grid>

		<Grid container rowSpacing={1} sx={{
			paddingTop:1
		}}>
			<Grid item md={12}>
				<Grid container component={Paper}  variant='container'>
					<Table
						//loading={loading}
						columns={columns}
						fetchData={fetchData}
					/>
				</Grid>
			</Grid>
		</Grid>

		<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("state",state)} >{'POKE ME to print state'}</Typography>
	</Grid>
	)
}

export default NykeDatasync;