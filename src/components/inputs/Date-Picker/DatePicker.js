/* eslint-disable no-unused-vars */
import React from 'react'
import {TextField,Grid,Typography,useTheme} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DatePicker as MUIDatePicker,LocalizationProvider} from '@mui/lab'

const DatePicker = ({
	label,
	name,
	size,
	handleChange,
	value,
	isLabelVisible,
	isDisabled
}) => {
	const [focus,setFocus] = React.useState(false)
	const [labelVisible,setLabelVisible] = React.useState(isLabelVisible)
	const theme = useTheme()

	const onChange = (value) => {
		const e = {
			target:{
				name:name,
				value:value
			}
		}
		handleChange(e)
	}
	return (
		<Grid item xs={12} md={size} component='div' style={{
			display:'flex',
			flexDirection:'column',
			paddingTop: labelVisible ? theme.spacing(1) : theme.spacing(0),
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<Typography variant='caption' sx={{
					display:labelVisible ? 'visible' : 'none',
					color: focus ? 'primary.main' : 'text.primary',
				}}>{label}</Typography>
			<LocalizationProvider dateAdapter={DateAdapter}>
				<MUIDatePicker
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					clearable
					disabled={isDisabled}
					label={labelVisible ? '' : label}
					value={value}
					onChange={onChange}
					renderInput={(params)=> <TextField {...params} fullWidth size='small' margin='dense' sx={{
						marginTop:0
					}}/>}
				/>
			</LocalizationProvider>
		</Grid>
	)
}

DatePicker.defaultProps = {
	isLabelVisible:false,
	isDisabled:false,
	label:'',
	placeholder:'',
	size:6,
	value:null,
	handleChange:()=>{}
}

export default DatePicker
