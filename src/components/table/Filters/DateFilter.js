import React from 'react'
import {SimpleDatePicker} from '../../../components/inputs';
// import {setValue} from '../../../store/filters/filters.slice';
import {useSelector
	// ,useDispatch
} from 'react-redux';

const DateFilter = ({
	column:{filterValue, preFilteredRows, setFilter},
	label,
	name
}) => {

	const [state,setState] = React.useState('');
	const reducer = useSelector(state => state.filters)
	// const dispatch = useDispatch();


	// const handleChange = useAsyncDebounce(value=>{
	//	setFilter({value} || undefined)
	//	dispatch(setValue({
	//		variant:'delivery_date',
	//		value:value || undefined
	//	}))
	// },200);

	React.useEffect(()=>{
		const rdd = reducer.delivery_date
		setFilter({value:rdd}||undefined)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<SimpleDatePicker
			isLabelVisible
			label={label}
			name={name}
			size={12}
			value={reducer.delivery_date||state}
			handleChange={(e)=> {
				// handleChange(e.target.value)
				setState(e.target.value)
			}}
		/>
	)
}

export default DateFilter
