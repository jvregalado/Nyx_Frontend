import React from 'react';
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';
// import {UploadDialog,GetInvoiceDialog,ExportDialog} from '../../dialogs';
// import {getTemplate} from '../../../store/data-upload';
// import {getBuffer} from '../../../store/data-download';
// import {useDispatch} from 'react-redux';


function Toolbar({onCreate,onReplan,uploadType,isUpload,isDownloadTemp,label,isCreate,isReplan,isGetInvoice,isExport,exportType}) {
    const [controls,setControls] = React.useState({
        uploadDialog:false,
        exportDialog:false,
        getInvoiceDialog:false
    });
   // const {delivery_date,location,} = useSelector(state => state.filters)
    // const dispatch=useDispatch();

    // const toggleUploadDialog = () =>{
    //     setControls({
    //         ...controls,
    //         uploadDialog:!controls.uploadDialog
    //     })
    // }

    // const toggleExportDialog = () =>{
    //     setControls({
    //         ...controls,
    //         exportDialog:!controls.exportDialog
    //     })
    // }

    // const downloadTemplate = () => {
    //     dispatch(getTemplate({
    //         type:uploadType
    //     }))
    // }

    const toggleInvoiceDialog = () =>{
        setControls({
            ...controls,
            getInvoiceDialog:!controls.getInvoiceDialog
        })
    }

    // const exportToExcel = () => {
    //     dispatch(getBuffer({
    //         route:exportType,
    //         location:'',
    //         rdd:'',
    //         type:''
    //     }))
    //     // console.log(exportType)
    // }

    return (
        <Paper elevation={0} variant='outlined' sx={{
            paddingLeft:2,
            paddingRight:2
        }}> 
            <MUIToolbar disableGutters>
                <Typography variant='h6'>{label}</Typography>
                <div style={{flexGrow: 1}}/>
                <div >
                    <Button 
                        sx={{
                            display: isCreate ? 'visible' : 'none'
                        }}
                        variant='kerry' 
                        onClick={onCreate}>
                            Create
                    </Button>
                    
                    <Button
                        sx={{
                            display: isReplan ? 'visible' : 'none'
                        }}
                        variant='kerry'
                        onClick={onReplan}
                    >
                        Replan Draft Bill
                    </Button>
{/* 
                    <Button
                        sx={{
                            display: isDownloadTemp ? 'visible' : 'none'
                        }}
                        variant='kerry'
                        onClick={downloadTemplate}
                    >
                        Download Template
                    </Button> */}
                    
                    {/* <Button
                        sx={{display: isUpload ? 'visible' : 'none'}}
                        variant='kerry'
                        onClick={toggleUploadDialog}>
                        Upload
                    </Button> */}

                    {/* <Button
                        sx={{display:isExport? 'visible':'none'}}
                        variant='kerry'
                        onClick={toggleExportDialog}>
                        Export
                    </Button> */}

                    <Button
                        sx={{display:isGetInvoice ? 'visible' : 'none'}}
                        variant='kerry'
                        onClick={toggleInvoiceDialog}>
                        get invoices
                    </Button>

                </div>
            </MUIToolbar>
            {/* <UploadDialog 
                name='file_upload'
                type={uploadType}
                isOpen={controls.uploadDialog}
                toggle={toggleUploadDialog}
            /> */}
            {/* <GetInvoiceDialog
                isOpen={controls.getInvoiceDialog}
                toggle={toggleInvoiceDialog}
            /> */}
            {/* <ExportDialog
                name='file_export'
                type={exportType}
                isOpen={controls.exportDialog}
                toggle={toggleExportDialog}
            /> */}
        </Paper>
    );
}

Toolbar.defaultProps = {
    onCreate: ()=>{},
    onReplan:()=>{},
    onGetInvoice:()=>{},
    uploadType:'',
    isUpload:false,
    isDownloadTemp:false,
    isCreate:false,
    isReplan:false,
    isGetInvoice:false
}

export default Toolbar;