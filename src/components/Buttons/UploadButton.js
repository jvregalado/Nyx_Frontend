import React from 'react'
import {TextField} from '@mui/material';
import * as XLSX from 'xlsx';

// function hasExtension(inputID, exts) {
//   var fileName = document.getElementById(inputID).value;
//   return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
// }

const FileUpload = ({getData}) =>{

    const onChange = e => {
      const file = e.target.files[0];
      const fileName=file.name;
      const reader =  new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        // const json = JSON.parse(convertToJson(data))
        getData(data,fileName)
      }

      reader.readAsBinaryString(file)
    }

    // const convertToJson = (csv) => {
    //   var lines = csv.split("\n");
  
    //   var result = [];
  
    //   var headers = lines[0].split(",");
  
    //   for (var i = 1; i < lines.length; i++) {
    //     var obj = {};
    //     var currentline = lines[i].split(",");
  
    //     for (var j = 0; j < headers.length; j++) {
    //       obj[headers[j]] = currentline[j];
    //     }
  
    //     result.push(obj);
    //   }
  
    //   //return result; //JavaScript object
    //   return JSON.stringify(result); //JSON
    // }
    
    return (
      <div style={{
        display:'flex',
        flexDirection:'column'
      }}>
          <label>File Upload</label>
          <TextField 
            id='file_upload'
            fullWidth
            size='small'
            type='file'
            onChange={onChange}
          />
      </div>
      
    )

}
export default FileUpload
