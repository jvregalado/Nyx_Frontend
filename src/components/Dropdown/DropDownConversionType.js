import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Select from 'react-select';

function BasicSelect({
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
      label:'ASN Template (CIC)',
      value:'ASNConvert',
      type: 'ASN'
    },
    {
      label:'ASN Template (CMIP)',
      value:'ASNConvertCMIP',
      type: 'ASN'
    },
    {
      label:'ASN Template (PO)',
      value:'ASNPo',
      type: 'ASN'
    },
    {
      label:'ASN Template (STO)',
      value:'ASNsto',
      type: 'ASN'
    },
    {
      label:'Outbound Order (Lazada)',
      value:'ODOLazada',
      type: 'ODO'
    },
    {
      label:'Outbound Order (Shopee)',
      value:'ODOShopee',
      type: 'ODO'
    },
    {
      label:'Outbound Order (Shopify)',
      value:'ODOShopify',
      type: 'ODO'
    }
  ]

  return (
    <div style={{
      display:'flex',
      flexDirection:'column'
    }}>
      <label>Conversion Type</label>
      <Select options={options} value={value} onChange={handleChange} isClearable/>
    </div>
  );
}

BasicSelect.defaultProps = {
  value:'',
  handleChange:()=>{}
}

export default BasicSelect;