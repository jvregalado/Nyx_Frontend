import React from 'react';
import {useDispatch} from 'react-redux'
import Select from 'react-select/async';
import {getSelectData} from '../../../store/select/select.slice';
import {useTheme,Typography} from '@mui/material';

function MasterSelect({
	type, /**type of dropdown (rc:Report Type, rc:Report System Type) */
	route, /**masterdata or administration or reasoncode */
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
		// console.log('type:', type, 'route:', route,)

		if(type === null || route === null){
			return setOptions([{
				label:'default',
				value:'default'
			}])
		}
		else {
			dispatch(getSelectData({
				route, /**masterdata or administration or reasoncode */
				type, /**type of dropdown */
			}))
			.unwrap()
			.then(result => {
				setOptions(result.data)
			})
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[type,route])

	return (
		<div style={{
			display:'flex',
			flexDirection:'column',
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