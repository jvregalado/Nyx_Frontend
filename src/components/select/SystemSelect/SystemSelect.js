import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {login_type} from '../../../utils/constants';

function SystemSelect({
	handleChange,
	value
}) {

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">System</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label="System"
				onChange={handleChange}
			>
				{
					login_type.map(item => {
						return <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
					})
				}
				{/* <MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem> */}
			</Select>
			</FormControl>
		</Box>
	)
}

SystemSelect.defaultProps = {
	value:'',
	handleChange:()=>{}
}

export default SystemSelect