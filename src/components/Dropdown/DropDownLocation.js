import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Select from 'react-select';

function LocationSelect({
  value,
  handleChange
}) {
  // const [conversionType, setType] = React.useState('');

  // const handleChange = (event) => {
  //   setType(event.target.value);
  //   console.log(conversionType);
  // };

  const options = [
	{
	  value:"ZEU-CIC",
	  label:"Zeus CIC"
	},
	{
	  value:"ZEU-PVM",
	  label:"Zeus PVM"
	}
  ]

  return (
	<div style={{
	  display:'flex',
	  flexDirection:'column'
	}}>
	  <label>Location</label>
	  <Select options={options} value={value} onChange={handleChange} isClearable/>
	</div>
  );
}

LocationSelect.defaultProps = {
  value:'',
  handleChange:()=>{}
}

export default LocationSelect;