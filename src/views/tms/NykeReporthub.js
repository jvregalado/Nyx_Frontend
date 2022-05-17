/* eslint-disable no-useless-escape */
/* eslint-disable dot-location */
import React from 'react';
import Spinner from '../../components/spinner/spinner'
import {Toolbar} from '../../components/Toolbar';
import {Grid,Paper
	 ,Typography
} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import {Input,DatePicker} from '../../components/inputs'
import {MasterSelect} from '../../components/select'
import {getReport,getReportCodes} from '../../store/tms_reporthub';
import {downloadBase64File} from '../../helpers/buttons'


const NykeReporthub = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {

	const {loading} = useSelector(state => state.tms_reporthub)
	const dispatch = useDispatch();
	const [state,setState] = React.useState({
		report		:''
	})

	const handleReportChange = (e,name) => {
		/**Reset the state if report dropdown is changed */
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
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	const handleDownloadExcel = () => {
		//console.log(state)
		dispatch(getReport({
			route:'reporthub/sp_DFDailyMonitoring_cdi',
			data:{
				...state
			}
		}))
		.unwrap()
		.then(result => {	
				if(result!=500)
					{
						//console.log(result.data.data)
						/** type format of Base64 */
						const typeFormat = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
						/** Get the Base64 from backend */
						const contentBase64=result.data.data.contents;
						const fileName=`Generated${result.data.data.fileName}`;
						downloadBase64File({
							typeFormat:{typeFormat},
							contentBase64,
							fileName
						})
					}
				}
			)
	}

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
				console.log(report_source_code,"report_source_code")
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
				label='Nyke Report Hub'
				isDownloadExcel={state?.source_code?.buttons?.isDownloadExcel || false}
				onDownloadExcel={handleDownloadExcel}
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
						module_code='tms reporthub'
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
								module_code='tms reporthub'
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
		<Grid item md={7}>
			<Grid container component={Paper} variant='container'>
				upload file goes here
			</Grid>
		</Grid>
		<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("state",state.dateFrom)} >{'POKE ME'}</Typography>
	</Grid>
	)
}

export default NykeReporthub;