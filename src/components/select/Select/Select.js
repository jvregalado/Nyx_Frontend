import React from 'react';
import * as constants from '../../../utils/constants';
import {Typography, useTheme} from '@mui/material';
import ReactSelect from 'react-select/async';

function Select({
	label,
	name,
	type,
	value,
	isDisabled,
	handleChange
}) {
	const theme = useTheme();
	const [options,setOptions] = React.useState([])

	const filterOptions = (inputValue) => {
		// eslint-disable-next-line no-eval
		return options.filter(i =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		)
	}

	React.useEffect(()=>{
		if(type !== ''){
			setOptions(constants[type])
		}
		else{
			let data = [
				{
					label:'Text Field',
					value:'text'
				}
			]

			setOptions(data)
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[type])
	return (
		<div style={{
			display:'flex',
			flexDirection:'column',
			// rowGap:1,
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<Typography variant='overline'>{label}</Typography>
			<ReactSelect
				styles={{
					menu: provided => ({...provided,zIndex: 9999}),
				}}
				placeholder={label}
				defaultOptions={options}
				loadOptions={(inputValue,callBack)=>{
					setTimeout(() => {
						callBack(filterOptions(inputValue))
					},1000)
				}}
				onChange={(e) => handleChange(e,name)}
				value={value}
				isDisabled={isDisabled}
				isClearable
			/>
		</div>
	);
}

Select.defaultProps = {
	label:'',
	type:'',
	value:'',
	name:'',
	isDisabled:false,
	handleChange:()=>{}
}
export default Select;