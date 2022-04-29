
/* eslint-disable no-useless-escape */
/* eslint-disable dot-location */
import React from 'react';
import Spinner from '../../components/spinner/spinner'
import {Toolbar} from '../../components/Toolbar';
import {Grid,Paper
	 ,Typography
	 //, Table
} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';

import nodeDate from 'date-and-time';

import {TableJSON} from '../../components/table';
import {Input,DatePicker} from '../../components/inputs'
import {MasterSelect} from '../../components/select'
import {getReportCodes, postUpload,postGenerate} from '../../store/tms_converter/tms_converter.slice';
import {downloadBase64File} from '../../helpers/buttons'

const NykeConverter = ({routes}) => {
	return (
		<View/>
	);
}


const View = () => {

	const {loading} = useSelector(state => state.tms_converter)
	const dispatch = useDispatch();
	const [state,setState] = React.useState({
		report		:''
	})

	const [fetchDataState,setfetchDataState] = React.useState({})

	
	const [controls,setControls] = React.useState({
		uploadDialog:false
	});
	
	const handleDownload = () => {
		//console.log(fetchDataState.filePath)
		dispatch(postGenerate({
			route:'converter/generate',
			data:{
				customerCode:fetchDataState.customerCode,
				toExcel:fetchDataState.toExcel,
				pdfFile:fetchDataState.pdfFile,
				id:fetchDataState.id
			}
		}))
		.unwrap()
		.then(result => {	
			
			if(result!=500)
			{
				/** type format of Base64 */
				const typeFormat = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				/** Get the Base64 from backend */
				const contentBase64=result.data.contents;
				const fileName=`Generated${fetchDataState.selectedFile}.xlsx`;
				downloadBase64File({
					typeFormat:{typeFormat},
					contentBase64,
					fileName
				})
				setfetchDataState({})
			}
		})
	}

	const toggleUploadDialog = () =>{
		//console.log(1,controls.uploadDialog)
		setControls({
			...controls,
			uploadDialog:!controls.uploadDialog
		})
	}

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
		/**reset setfetchDataState and  setuploadState if there is a change in dropdown*/
		setfetchDataState({});
		setuploadState({
			selectedFile: null,
			loaded: 0
		})
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	/* upload start */
	const [uploadState,setuploadState] = React.useState({
        selectedFile: null,
		loaded: 0
	})

	const handleUpload=(e)=>{
		setuploadState({
		
		selectedFile: e.target.files[0],
		loaded: 0,
	 	})
	 	setfetchDataState({
			 ...fetchDataState,
			 /** getting file name then display to title */
			 selectedFile:fetchDataState?.selectedFile||e.target.files[0].name
		 })
	}

	/**check if file to see the status change */
	const handleCheck = () => {
		  dispatch(postUpload({
			route:'converter',
			data:{
				file:null,
				value:state,
				id:fetchDataState?.id||null,
				fileName:fetchDataState?.selectedFile||null,
				JSONExcel:fetchDataState?.toExcel||null
			}
		}))
		.unwrap()
		.then(result => {
			if(result!=500)
			{
				const toExcel=JSON.parse(JSON.stringify(result.data.toExcel))
				setfetchDataState(
					{
						...fetchDataState,
						toExcel,
						ConversionCode:result.data.ConversionCode,
						customerCode:result.data.customerCode,
						pdfFile:result?.data?.pdfFile
					}
					)
				//console.log("fetchDataState",result.data.toExcel)
			}
		})
	}


	const handleConfirm = () => {
		var file = uploadState.selectedFile;
		const now = nodeDate.format(new Date(), 'MMDDYYYY-HHmmss');
		if(file!=null){
			var reader = new FileReader();
			reader.onload = function() {
	 		 	const data = reader.result;
				  //console.log(data);
				  dispatch(postUpload({
					route:'converter',
					data:{
						file:data,
						value:state,
						id:fetchDataState?.id||now,
						fileName:file.name,
						reupload:fetchDataState?.id||false
					}
				}))
				.unwrap()
				.then(result => {
					if(result!=500)
					{
						toggleUploadDialog()
						const toExcel=JSON.parse(JSON.stringify(result.data.toExcel))
						setfetchDataState(
							{
								...fetchDataState,
								toExcel,
								pdfFile:result?.data?.pdfFile,
								id:fetchDataState?.id||now,
								ConversionCode:result?.data?.ConversionCode||null,
								customerCode:result?.data?.customerCode||null
							}
							)
						//console.log("fetchDataState",result.data.toExcel)
					}
				})
			};
			reader.readAsDataURL(file);
		}
	}

	React.useEffect(() => {
		if(state.report !== '' && state.report !== null) {
			dispatch(getReportCodes({
				route:'converter',
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
				label='Nyke Converter'
				isUpload={state?.source_code?.buttons?.isUpload || false}
				onUpload={handleUpload}
				onConfirm={handleConfirm}
				toggleUploadDialog={toggleUploadDialog}
				isOpen={controls.uploadDialog}
				isCheck={state?.source_code?.buttons?.isCheck || false}
				onCheck={handleCheck}
				isGenerate={state?.source_code?.buttons?.isGenerate || false}
				onGenerate={handleDownload}
			/>
		</Grid>
		<Grid item md={5}>
			<Grid container component={Paper} variant='container'>
				<Grid item md={12}>
					<MasterSelect
						paddingLeft={1}
						paddingRight={1}
						fullWidth
						label='Converter Name'
						placeholder='Converter Name'
						name='report'
						route='administration'
						type='report'
						module_code='tms converter'
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
								module_code='tms converter'
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
				<TableJSON
					data={fetchDataState?.toExcel||[]}
					columns={state?.source_code?.columns || []}
					title={
						fetchDataState?.selectedFile ||
						`Empty`}
					filename={fetchDataState?.selectedFile ||
						`Empty`}
					//fetchData={fetchDataState}
				/>
			</Grid>
			{/* <Grid container component={Paper} variant='container'>
				upload file goes here
			</Grid> */}
		</Grid>
		<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("state",state)} >{'POKE ME'}</Typography>
	</Grid>
	)
}

export default NykeConverter;