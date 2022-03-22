import React from 'react';
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';

function Toolbar({
	isCreate,
	onCreate,
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
					<Button sx={{ display: isCreate ? 'visible' : 'none' }}
						variant='kerry'
						onClick={onCreate}>
							Create
					</Button>

				</div>
			</MUIToolbar>
		</Paper>
	);
}

Toolbar.defaultProps = {
	isCreate:		false,
	onCreate:		()=>{},
	isUpload:		false,
	uploadType:		'',
	isDownloadTemp:	false,
	isExport:		false
}

export default Toolbar;