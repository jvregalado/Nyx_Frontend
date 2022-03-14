import React from 'react';
import {useDispatch} from 'react-redux'
import Select from 'react-select/async';
import {getSelectData} from '../../../store/select/select.slice';
import {useTheme,Typography} from '@mui/material';

function MasterSelect({
	type,
	systemType,
	name,
	value,
	isDisabled,
	handleChange,
	placeholder,
	label,
	paddingLeft,
	paddingRight
}) {
	const theme = useTheme()
	const [options,setOptions] = React.useState([])
	const dispatch = useDispatch();

	const filterInput = (inputValue) => {
		// console.log(options)
		// eslint-disable-next-line no-eval
		return options.filter(i =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		)
	}

	React.useEffect(()=>{
		if(type === '' || systemType === ''){
			return setOptions([{
				label:'default',
				value:'default'
			}])
		}
		else{
			dispatch(getSelectData({
				systemType, //wms or tms or fin or admin
				type, //type of dropdown
			}))
			.unwrap()
			.then(result => {
				setOptions(result.data)
			})
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[type,systemType])

	return (
		<div style={{
			display:'flex',
			flexDirection:'column',
			paddingLeft:theme.spacing(paddingLeft),
			paddingRight:theme.spacing(paddingRight)
			
		}}>
			{label ? null : <Typography variant='overline'>{label}</Typography>}
			<Select
				isDisabled={isDisabled}
				styles={{menu: provided => ({...provided,zIndex: 9999})}}
				placeholder={placeholder}
				defaultOptions={[]}
				loadOptions={(inputValue,callBack)=>{
					setTimeout(() => {
						callBack(filterInput(inputValue))
					},1000)
				}}
				value={value}
				onChange={e => handleChange(e,name)}
				isClearable
			/>
		</div>
	);
}

MasterSelect.defaultProps = {
	type:'',
	label:'',
	name:'',
	value:'',
	isDisabled:false,
	handleChange:()=>{},
	paddingLeft:0,
	paddingRight:0
}

/*
Select Types
	principal
	whseLocation
	service_type
	ship-point
	trucker
	truck-type
	quick-code
	tariff
	geography
	aggregation
	quick-code 
		-SRV_TYP
		-CLSOFSTR
*/

export default MasterSelect;