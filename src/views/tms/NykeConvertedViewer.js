import React from 'react';
import {Toolbar} from '../../components/toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import {Table,TableJSON} from '../../components/table';
import {useDispatch,useSelector} from 'react-redux';
import {getRTVview,postUpload,getRTVDetails} from '../../store/tms_converter/tms_converter.slice';
// import {downloadBase64File} from '../../helpers/buttons'

const NykeConvertedViewer = ({routes}) => {
	return (
		<View/>
	);
}

const View = () => {
	const dispatch = useDispatch();
	const {loading} = useSelector(state => state.admin_user)
	//const [selectedUser,setSelectedUser] = React.useState({user_email:null});
	const [createTrigger,setCreateTrigger] = React.useState(false);
	const [updateTrigger,setUpdateTrigger] = React.useState(false);

	const [uploadState,setuploadState] = React.useState({
		selectedFile: null,
		loaded: 0
	})
	const [fetchDataState,setfetchDataState] = React.useState({})
	
	const [controls,setControls] = React.useState({
		uploadDialog:false
	});

	const columnsToExcel=[ { "label":"RTV", "name":"RTV" }, { "label":"RTV Date", "name":"RTV Date" }, { "label":"Site Code", "name":"Site Code" }, { "label":"Site Name", "name":"Site Name" }, { "label":"Site Address", "name":"Site Address" }, { "label":"Status", "name":"Status" }  ] 

	const columns = React.useMemo(()=>[
		{
			Header:'ID',
			accessor:'id',
			width:140,
			Cell:props => {
				const onClick = () => {
					handleRTVDetails({id:props.value})
				}
				return (<Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={onClick} >{props.value}</Typography>)
			}
		},
		{
			Header:'Status',
			accessor:'c_status',
			width:100,
		},
		{
			Header:'Uploaded Filename',
			accessor:'uploaded_file_name'
		},
		{
			Header:'Uploaded By',
			accessor:'creator.user_email'
		},
		{
			Header:'Uploaded Date',
			accessor:'uploaded_date'
		},
		{
			Header:'Checked By',
			accessor:'checker.user_email'
		},
		{
			Header:'Check Date',
			accessor:'checked_date'
		},
		{
			Header:'Generated By',
			accessor:'generate.user_email'
		},
		{
			Header:'Generated Date',
			accessor:'generated_date'
		},
		{
			Header:'Last Generated By',
			accessor:'lastgenerate.user_email'
		},
		{
			Header:'Last Generated Date',
			accessor:'last_generated_date'
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	],[])

	const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack) => {
		dispatch(getRTVview({
			route		:	'converter',
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

	const toggleUploadDialog = () =>{
		//console.log(1,controls.uploadDialog)
		setControls({
			...controls,
			uploadDialog:!controls.uploadDialog
		})
	}

	const handleRTVDetails = ({id}) => {
		dispatch(getRTVDetails({
			route	: 'converter/details',
			filters	: {id}
		}))
		.unwrap()
		.then(result => {
			const details = result.data[0];
			console.log("details",details)
			setfetchDataState({
				//...fetchDataState,
				id:details.id,
				selectedFile:details.uploaded_file_name,
				rtvType:details.rtv_type,
				uploadedStatus:details.c_status,
				c_status:details.c_status
			},handleCheck())
			//
		})
		
	}

	const handleConfirm = () => {
		var file = uploadState.selectedFile;
		if(file!=null){
			var reader = new FileReader();
			reader.onload = function() {
	 		 	const data = reader.result;
				  //console.log(data);
				  dispatch(postUpload({
					route:'converter',
					data:{
						file:data,
						value:fetchDataState?.value||null,
						id:fetchDataState?.id||null,
						fileName:file.name,
						reupload:fetchDataState?.id||false,
						c_status:fetchDataState?.c_status||null
					}
				}))
				.unwrap()
				.then(result => {
					if(result!==500)
					{
						toggleUploadDialog()
						const toExcel=JSON.parse(JSON.stringify(result.data.toExcel))
						setfetchDataState(
							{
								...fetchDataState,
								toExcel,
								pdfFile:result?.data?.pdfFile,
								id:fetchDataState?.id||null,
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

	const handleCheck = () => {
		console.log("fetchDataState2",fetchDataState);
		dispatch(postUpload({
			route:'converter',
			data:{
				file:null,
				reupload:fetchDataState?.id||null,
				rtvType:fetchDataState.rtvType,
				id:fetchDataState?.id||null,
				fileName:`${fetchDataState?.id||null}.csv`,
				JSONExcel:fetchDataState?.toExcel||null,
				c_status:fetchDataState?.c_status||null
			}
		}))
		.unwrap()
		.then(result => {
			if(result!==500) {
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
				console.log("toExcel",toExcel)
			}
		})
	}

	return (
		<Grid container rowSpacing={1}>
		<Grid item md={12}>
			<Toolbar
				label='Nyke Converter Viewer'
				isUpload={true}
				onUpload={handleUpload}
				onConfirm={handleConfirm}
				toggleUploadDialog={toggleUploadDialog}
				isOpen={controls.uploadDialog}
				isCheck={true}
				onCheck={handleCheck}
				isGenerate={true}
				//onGenerate={handleDownload}
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
		<Grid item md={12}>
		<Grid container component={Paper} variant='container'>
				<TableJSON
					data={fetchDataState?.toExcel||[]}
					columns={columnsToExcel}
					title={
						fetchDataState?.selectedFile ||
						`Empty`}
					filename={fetchDataState?.selectedFile ||
						`Empty`}
					//fetchData={fetchDataState}
				/>
			</Grid>
		</Grid>
	</Grid>
	)
}

export default NykeConvertedViewer;