import { Grid } from '@mui/material';
import React from 'react';
import {SimpleDatePicker} from '../../../components/inputs';
import {useAsyncDebounce} from 'react-table'

const DateRangeFilter = ({
	column:{filterValue, preFilteredRows, setFilter},

}) => {
	const [state,setState] = React.useState({
		from:'',
		to:''
	})

	React.useEffect(()=>{
		handleFilterChange()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[state])

	const handleFilterChange = useAsyncDebounce(()=>{
		if(state.from==='' || state.to===''){
			setFilter(undefined)
		}
		else if(state.from !== '' && state.to !== ''){
			setFilter({value:`${state.from},${state.to}`})
		}
	},200)

	const handleChange=(e)=>{
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	return (
		<Grid item container>
			<SimpleDatePicker isLabelVisible label='From' name='from' size={6} value={state.from} handleChange={handleChange}/>
			<SimpleDatePicker isLabelVisible label='to' name='to' size={6} value={state.to} handleChange={handleChange}/>

			{/* <DatePicker isLabelVisible label='To' name='to' size={6} value={state.to} handleChange={handleChange}/> */}
		</Grid>
	)
}

export default DateRangeFilter
