import React from 'react'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography, Checkbox } from '@mui/material';

const RoleTable = ({data,handleChangeHeader}) => {

	return (
		<Grid component={Paper} variant='outlined' container rowSpacing={1}
		sx={{
			marginTop:1,
			paddingLeft:2,
			paddingRight:2
		}}>
			<Grid item container md={12}>
				<Grid item md={1}>
					<Typography gutterBottom variant='button'>{'Modules'}</Typography>
				</Grid>
				<Grid item md={5}>
					<Typography gutterBottom variant='button'>{'Report Code'}</Typography>
				</Grid>
				<Grid item md={6}>
					<Typography gutterBottom variant='button'>{'Report Name'}</Typography>
				</Grid>
			</Grid>
			<Divider orientation='horizontal' flexItem style={{width:'100%'}}/>
			<Grid item container md={12}>
				{
					data.map((mod,index) => {
						const sub_modules = mod.sub_modules
						return(
							<Grid key={index} alignItems='center' item container md={12}>
								<Grid item md={6}>
									<Checkbox checked={mod.role_module_status} onChange={(e) => handleChangeHeader(e,mod)}/>
									<Typography variant='button'>{mod.module_name}</Typography>
								</Grid>
								<Grid container item md={12}>
									{
										sub_modules.map((sub,index) => {
											return (
												<Grid key={index} item container md={12}>
													<Grid item md={1}/>
													<Grid item md={5}>
														<Typography variant='overline'>{sub.report_code}</Typography>
													</Grid>
													<Grid item md={6}>
														<Typography variant='overline'>{sub.report_name}</Typography>
													</Grid>
												</Grid>
											)
										})
									}
								</Grid>
								<Divider orientation='horizontal' flexItem style={{width:'100%'}}/>
							</Grid>
						)
					})
				}
			</Grid>
		</Grid>
	)
}

RoleTable.defaultProps = {
	column:[],
	data:[]
}

export default RoleTable