import React from 'react';
import {useDispatch} from 'react-redux'
import Select from 'react-select/async';
import {getSelectData} from '../../../store/select/select.slice';
import {useTheme,Typography} from '@mui/material';

function MasterSelect({
	route, /**masterdata or administration or reasoncode */
	type, /**type of dropdown (rc:Report Type, rc:Report System Type) */
	module_code, /**wms reporthub, wms converter, wms dashboard, wms interface, etc. */
	name,
	value,
	label,
	handleChange,
	isDisabled,
	placeholder,
	paddingLeft,
	paddingRight,
}) {
	const theme = useTheme()
	const [options,setOptions] = React.useState([])
	const [focus,setFocus] = React.useState(false)
	const dispatch = useDispatch();

	const filterInput = (inputValue) => {
		// console.log(inputValue, options?.length, options)
		// eslint-disable-next-line no-eval
		if(!options) {
			return null
		}
		return options.filter(i =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		)
	}

	React.useEffect(()=>{
		// console.log('module_code:', module_code)

		if(type === null || route === null || (type === 'report' && module_code === '')){
			return setOptions([{
				label:'default',
				value:'default'
			}])
		}
		else {
			dispatch(getSelectData({
				route, /**masterdata or administration or reasoncode */
				type, /**type of dropdown */
				module_code /**wms reporthub, wms converter, wms dashboard, wms interface, etc. */
			}))
			.unwrap()
			.then(result => {
				setOptions(result.data)
			})
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[type, route])

	return (
		<div style={{
			display:'flex',
			flexDirection:'column',
			paddingBottom:theme.spacing(1),
			paddingLeft:theme.spacing(paddingLeft),
			paddingRight:theme.spacing(paddingRight)
		}}>
			<Typography sx={focus ? {color:'primary.main'}:{color:'text.primary'}} variant='caption'>{label}</Typography>
			<Select
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				isDisabled={isDisabled}
				styles={{menu: provided => ({...provided,zIndex: 9999})}}
				placeholder={placeholder}
				defaultOptions={[]}
				loadOptions={(inputValue,callBack)=>{
					setTimeout(() => {
						callBack(filterInput(inputValue))
					},1200)
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
	route:'',
	label:'',
	name:'',
	value:'',
	module_code:'',
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