import React from 'react'
import {Button, Grid} from '@mui/material';
import {UploadButton} from '../components/Buttons';
import {DropDownConversionType,DropDownLocation} from '../components/Dropdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import {saveAs} from 'file-saver'

const Content = () => {
    const [state,setState] = React.useState({
        conversionType:{type:null,value:null},
        locationDrop:{value:null},
        data:[],
        fileName:null
    })

    function resetUpload(){
        document.getElementById('file_upload').value = ''
    }
    const handleChange = (e) => {
        setState({
            ...state,
            conversionType:e,
            data:[]
        })
        resetUpload()
    }

    const locationChange = (e) => {
        setState({
            ...state,
            locationDrop:e,
            data:[]
        })
        resetUpload()
    }

    const getData = (data,fileName) => {
        try
        {
            setState({
                ...state,
                data:data,
                fileName:fileName
            })
        }
        catch(e){
            return toast.error(e);
        }
    }

    const handleDownload = () => {
        const nData = state.data;
        const contype = state.conversionType.type;
        const val = state.conversionType.value;
        const loc = state.locationDrop.value;
        const fileName = state.fileName;
        if(nData.length <= 0){
            return toast.error('No File uploaded!');
        }
        if(val===null)
        {
            return toast.error('Please select Conversion Type');
        }
        if(loc===null)
        {
            return toast.error('Please select a Location');
        }
// console.log(fileName);

let URL;

if(process.env.NODE_ENV === 'development'){
    URL = process.env.REACT_APP_API_DEV
    console.log('development')
}
else {
    URL = process.env.REACT_APP_API
}
        
        axios.post(`${URL}conversion/${contype}/${val}`,{
            fromFront:nData
        },{
            params:{
                WarehouseID:loc,
                fileName,
                valcon:val
            },
            responseType: 'arraybuffer'
            
        })
        .then(result => {
            let blob = new Blob([result.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
            saveAs(blob,`Generated${fileName}.xlsx`)
            state.data=[];
            resetUpload()
            return toast.success('Download Successful');
        }).catch(error =>{
            try{
            const m = String.fromCharCode.apply(null, new Uint8Array(error.response.data));
            const msg = JSON.parse(m);
            toast.error(`${msg.message}`);    }
            catch(e){
                toast.error(`${e}`);
            }
        })


        
            // const xhr = new XMLHttpRequest();
            // const url = `http://localhost:5000/conversion/${type}/${val}?WarehouseID=${loc}`;
            // xhr.open("POST", url, true);
            // xhr.setRequestHeader("Content-Type", "application/json");
            // var dataJSON = JSON.stringify({odo:nData});
            // console.log(dataJSON);
            // const outFile = xhr.response.JSON({});
            // console.log(outFile);
        

    }

    return (
        <Grid container columnSpacing={2} rowSpacing={1} sx={{
            padding:2
        }}>
            
            <Grid item md={3}>
                <DropDownLocation value={state.locationDrop} handleChange={locationChange}/>
            </Grid>
            <Grid item md={3}>
                <DropDownConversionType value={state.conversionType} handleChange={handleChange}/>
            </Grid>
            <Grid item md={6}>
                <UploadButton getData={getData} />
            </Grid>
            <Grid item md={12} display='flex' columnGap={1}>
                <div style={{flexGrow:1}}/>
                {/* <Button variant='contained' onClick={handleUpload}>Upload</Button> */}
                <Button variant='contained' onClick={handleDownload}>Download</Button>
            </Grid>
        </Grid>
    )
}

export default Content
