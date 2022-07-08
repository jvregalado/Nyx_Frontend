/* eslint-disable no-useless-escape */
/* eslint-disable dot-location */
import React from 'react';
import Spinner from '../../components/spinner'
import {Toolbar} from '../../components/toolbar';
import {
	Grid,
	Paper,
	Typography
} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import {Input, DatePicker} from '../../components/inputs'
import {downloadBase64File} from '../../helpers/buttons'
import {MasterSelect} from '../../components/select'
import {getReport,getReportCodes} from '../../store/wms_reporthub';

const KairosReporthub = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {

	const {loading} = useSelector(state => state.wms_reporthub)
	const dispatch = useDispatch();
	const [state,setState] = React.useState({
		report		: '',
		filters		: {}
	})

	const handleReportChange = (e,name) => {
		/**Reset the state if report dropdown is changed*/
		setState({
			[name]:e
		})
	}

	const handleSelectChange = (e,name) => {
		setState({
			...state,
			[name]:e
		})
	}

	const handleChange = (e) => {
		// console.log('e',e.target)
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	const handleDownloadExcel = () => {
		//console.log(state)
		dispatch(getReport({
			route:'reporthub',
			downloadType:'xlsx',
			data:{
				...state
			}
		}))
		.unwrap()
		.then(result => {
			//## type format of Base64
			const typeFormat = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			const contentBase64 = result.data.contents;
			const filename =`${result.data.filename}`;
			downloadBase64File({
				typeFormat : { typeFormat },
				contentBase64,
				filename
			})
			}
		)
	}

	const handleDownloadPdf = () => {
		//console.log(state)
		dispatch(getReport({
			route:'reporthub',
			downloadType:'pdf',
			data:{
				...state
			}
		}))
	}

	/**Fetching the source code on the report*/
	React.useEffect(() => {
		if(state.report !== '' && state.report !== null) {
			dispatch(getReportCodes({
				route:'reporthub',
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
				label='Kairos Report Hub'
				isDownloadExcel={state?.source_code?.buttons?.isDownloadExcel || false}
				onDownloadExcel={handleDownloadExcel}
				isDownloadPdf={state?.source_code?.buttons?.isDownloadPdf || false}
				onDownloadPdf={handleDownloadPdf}
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
						value={state.report || ''}
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
								module_code='wms reporthub'
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
		<Grid item md={7} sx={{ paddingLeft: 1 }}>
			<Grid container component={Paper} variant='container'>
				<Grid item md={12}>

					{/**Dynamically Generate the Report Details */}
					{	typeof state?.source_code?.descriptions === 'object' ?
						state?.source_code?.descriptions.map((foo,i) => (
							<Grid item md={12}>
								<Typography>
									<Typography variant="button" display="block" sx={{ fontWeight: 'bold' }}>{Object.keys(foo)[0]}</Typography>
										<Typography sx={{ paddingLeft: 2 }} variant='subtitle2' key={i} gutterBottom>{foo[Object.keys(foo)[0]]}</Typography>
								</Typography>
							</Grid>
						)) : <Typography variant='body1' >No report selected</Typography>
					}

				</Grid>
			</Grid>
		</Grid>
		{/* <Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("state",state)} >{'.'}</Typography> */}
	</Grid>
	)
}

export default KairosReporthub;