import React from 'react';
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';

function Toolbar({
	isCancel,
	onCancel,
	isCreate,
	onCreate,
	isConfirm,
	onConfirm,
	isUpload,
	uploadType,
	isDownloadTemp,
	isExport,
	exportType,
	label,
}) {

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

				</div>
			</MUIToolbar>
		</Paper>
	);
}

Toolbar.defaultProps = {
	isCancel:		false,
	onCancel:		()=>{},
	isCreate:		false,
	onCreate:		()=>{},
	isConfirm:		false,
	onConfirm:		()=>{},
	isUpload:		false,
	uploadType:		'',
	isDownloadTemp:	false,
	isExport:		false
}

export default Toolbar;