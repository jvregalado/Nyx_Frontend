import React from 'react';
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';
import {UploadDialog} from '../../components/dialogs';


function Toolbar({
	isCancel,
	onCancel,
	isCreate,
	onCreate,
	isConfirm,
	onConfirm,
	isDownloadExcel,
	onDownloadExcel,
	isDownloadPdf,
	onDownloadPdf,
	label,
	isUpload,
	onUpload,
	uploadType,
	toggleUploadDialog,
	isOpen,
	isGenerate,
	onGenerate,
	isCheck,
	onCheck
}) {

	// const [controls,setControls] = React.useState({
	// 	uploadDialog
	// });


	return (
		<Paper elevation={0} variant='outlined' sx={{
			paddingLeft:1,
			paddingRight:1
		}}>
			<MUIToolbar >
				<Typography variant='h6'>{label}</Typography>
				<div style={{flexGrow: 1}}/>
				<div >
					<Button sx={{ display: isCancel ? 'visible' : 'none' }} color='secondary' variant='contained' onClick={onCancel}>
						Back
					</Button>
					<Button sx={{ display: isCreate ? 'visible' : 'none' }} variant='kerry' onClick={onCreate}>
						Create
					</Button>
					<Button sx={{ display: isConfirm ? 'visible' : 'none' }} variant='kerry' onClick={onConfirm}>
						Confirm
					</Button>
					<Button sx={{ display: isDownloadExcel ? 'visible' : 'none' }} variant='spreadsheet' onClick={onDownloadExcel}>
						Download Spreadsheet
					</Button>
					<Button sx={{ display: isDownloadPdf ? 'visible' : 'none' }} variant='pdf' onClick={onDownloadPdf}>
						Download PDF
					</Button>
					<Button sx={{display: isUpload ? 'visible' : 'none'}} variant='upload' onClick={toggleUploadDialog}>
						Upload
					</Button>
					<Button sx={{ display: isCheck ? 'visible' : 'none' }} variant='check' onClick={onCheck}>
						Check
					</Button>
					<Button sx={{display: isGenerate ? 'visible' : 'none'}} variant='spreadsheet' onClick={onGenerate}>
						Generate
					</Button>

				</div>
			</MUIToolbar>
			<UploadDialog
				name='file_upload'
				type={uploadType}
				isOpen={isOpen}
				toggle={toggleUploadDialog}
				onUpload={onUpload}
				onConfirm={onConfirm}
			/>
		</Paper>
	);
}

Toolbar.defaultProps = {
	isOpen			: false,
	isCancel		: false,
	onCancel		: ()=>{},
	isCreate		: false,
	onCreate		: ()=>{},
	isConfirm		: false,
	onConfirm		: ()=>{},
	isDownloadExcel : false,
	onDownloadExcel	: ()=>{},
	isDownloadPdf	: false,
	onDownloadPdf	: ()=>{},
	uploadType		: '',
	onUpload		: ()=>{},
	isGenerate	: false,
	onGenerate	: ()=>{},
	isCheck	: false,
	onCheck	: ()=>{}
}

export default Toolbar;