/* eslint-disable no-unused-vars */
import React from 'react';
import {TextField,Grid,useTheme,Typography} from '@mui/material';
function Input({
	label,
	name,
	size,
	handleChange,
	value,
	isLabelVisible,
	isDisabled
}) {
	const [focus,setFocus] = React.useState(false)
	const [labelVisible,setLabelVisible] = React.useState(isLabelVisible)
	const theme = useTheme()
	return (
		<Grid item xs={12} md={size} component='div' sx={{
			display:'flex',
			flexDirection:'column',
			paddingTop: labelVisible ? theme.spacing(1) : theme.spacing(0),
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<Typography variant='caption' sx={{
					display:labelVisible ? 'visible' : 'none',
					color: focus ? 'primary.main' : 'text.primary',
				}}
			>{label}</Typography>

			<TextField
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				disabled={isDisabled}
				sx={{marginTop:0}}
				fullWidth
				name={name}
				size='small'
				label={labelVisible ? '' : label}
				placeholder={label}
				margin='dense'
				variant='outlined'
				value={value || ''}
				onChange={handleChange}
			/>
		</Grid>
	);
}

Input.defaultProps = {
	isLabelVisible	:false,
	isDisabled		:false,
	label			:'',
	placeholder		:'',
	size			:6,
	value			:'',
	handleChange	:()=>{}
}

export default Input;