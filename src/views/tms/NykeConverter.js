
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
import {getReportCodes, postUpload} from '../../store/tms_converter/tms_converter.slice';


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

	const [fetchDataState,setfetchDataState] = React.useState([])

	
	const [controls,setControls] = React.useState({
		uploadDialog:false
	});
	
	const toggleUploadDialog = () =>{
		console.log(1,controls.uploadDialog)
		setControls({
			...controls,
			uploadDialog:!controls.uploadDialog
		})
	}
	
	const columns = [
		
		{
			label:'RTV',
			name:'RTV'
		},
		{
			label:'RTV Date',
			name:'RTV Date'
		},
		{
			label:'Site Code',
			name:'Site Code'
		},
		{
			label:'Site Name',
			name:'Site Name'
		},
		{
			label:'Site Address',
			name:'Site Address'
		},
		{
			label:'Status',
			name:'Status'
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	]

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

	

	/* upload start */
	const [uploadState,setuploadState] = React.useState({
        selectedFile: null,
		loaded: 0
	})

	const handleUpload=(e)=>{
		//console.log(e.target.files[0]);
		setuploadState({
		selectedFile: e.target.files[0],
		loaded: 0,
	 })
	}

	const handleConfirm = () => {
		var file = uploadState.selectedFile;
		
		//console.log(file)
		const now = nodeDate.format(new Date(), 'MMDDYYYY-HHmmss');
		if(file!=null){
			var reader = new FileReader();
			reader.onload = function() {
	  		//console.log(state.value);
	 		 	const data = reader.result;
				  //console.log(data);
				  dispatch(postUpload({
					route:'converter',
					data:{
						file:data,
						value:state,
						id:now,
						fileName:file.name
					}
				}))
				.unwrap()
				.then(result => {
					if(result!=500)
					{
						toggleUploadDialog()
						console.log("result.data.toExcel",result.data.toExcel)
						setfetchDataState(JSON.parse(JSON.stringify(result.data.toExcel)))
						console.log("result.data.toExcel",fetchDataState)
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
					data={fetchDataState}
					columns={columns}
					title={
						uploadState?.selectedFile?.name ||
						`Empty`}
					filename={uploadState?.selectedFile?.name ||
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