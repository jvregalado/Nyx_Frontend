import React from 'react';
import {TextField,Grid,useTheme, MenuItem} from '@mui/material';

function Select({label,name,size,handleChange,value}) {
	const theme = useTheme()
	const [state,setState] = React.useState([])

	React.useEffect(()=>{
		if(name==='algo_type'){
			setState([
				{
					value:'BUY',
					label:'Buy'
				},
				{
					value:'SELL',
					label:'Sell'
				}
			])
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<Grid item xs={12} md={size} component='div' style={{
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<TextField
				fullWidth
				select
				name={name}
				size='small'
				label={label}
				margin='dense'
				variant='outlined'
				onChange={handleChange}
				value={value}
			>
				{
					state.map(item=>(
						<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
					))
				}

			</TextField>

		</Grid>
	);
}

Select.defaultProps = {
	label:'',
	placeholder:'',
	size:6,
	value:'',
	handleChange:()=>{}
}

export default Select;