import React from 'react'
import {TextField,Grid,Typography,useTheme} from '@mui/material';


const SimpleDatePicker = ({label,name,size,handleChange,value,isLabelVisible,isDisabled}) => {
	const theme = useTheme()
	// const onChange = (value) => {
	// 	const e = {
	// 		target:{
	// 			name:name,
	// 			value:value
	// 		}
	// 	}
	// 	console.log(value)
	// 	handleChange(e)
	// }

	return (
		<Grid item xs={12} md={size} component='div' style={{
			display:'flex',
			flexDirection:'column',
			paddingTop: isLabelVisible ? theme.spacing(0) : theme.spacing(1),
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<Typography sx={{
					display:isLabelVisible ? 'visible' : 'none',
				}}
				variant='overline'>{label}</Typography>
			<TextField
				size='small'
				type='date'
				sx={{marginTop:0}}
				fullWidth
				name={name}
				label={label}
				placeholder={label}
				margin='dense'
				variant='outlined'
				value={value}
				onChange={handleChange}
				InputLabelProps={{
					shrink:true
				}}
			/>
		</Grid>
	)
}

SimpleDatePicker.defaultProps = {
	isLabelVisible:false,
	isDisabled:false,
	label:'',
	placeholder:'',
	size:6,
	value:null,
	handleChange:()=>{}
}


export default SimpleDatePicker