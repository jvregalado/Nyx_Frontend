import React from 'react';
import * as constants from '../../utils/constants/constants';
import {Typography, useTheme, Tooltip} from '@mui/material';
import ReactSelect from 'react-select/async';


const MultiSelect = ({
	label,
	name,
	type,
	value,
	isDisabled,
	handleChange,
	// hasToolTip,
	toolTip
}) => {
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
			setOptions([])
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[type])


	return (
		<div style={{
			display:'flex',
			flexDirection:'column',
			paddingLeft:theme.spacing(1),
			paddingRight:theme.spacing(1)
		}}>
			<Tooltip
				title		={toolTip}
				placement	='bottom-start'
			>
				<Typography variant='overline'>{label}</Typography>
			</Tooltip>
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
				isMulti
				isClearable
			/>
		</div>
	)
}

MultiSelect.defaultProps = {
	label:'',
	type:'',
	value:'',
	name:'',
	isDisabled:false,
	handleChange:()=>{},
	// hasToolTip:true,
	toolTip:''
}

export default MultiSelect
