import React from 'react';
import {Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	// Typography,
	DialogActions} from '@mui/material';
// import {useSelector} from 'react-redux'
// import {Spinner} from '../../components';

const UploadDialog = ({
	name,
	type,
	isOpen,
	toggle,
	onConfirm,
	onUpload
}) => {
	//const {loading} = useSelector(state => state.dataUpload)
	//const [isLoading,setLoading] = React.useState(false);
	const [state,setState] = React.useState(
		{
			header:[],
			details:[]
		}
	);

	React.useEffect(()=>{
		setState({
			...state,
			data:[]
		})
		// setData([])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[isOpen])

	return (
		<Dialog maxWidth='md' open={isOpen}>
			{/* <Spinner loading={loading}/> */}
			{/* //<Spinner loading={isLoading}/> */}
			<DialogTitle>File Upload</DialogTitle>
				<Grid component={DialogContent} container rowSpacing={1}>
					<Grid item xs={12}>
						{/* <Typography variant='caption'>COUNT: {state.data.length}</Typography> */}
					</Grid>
					<Grid item xs={12}>
						<TextField id={name} fullWidth type='file' onChange={onUpload}/>
					</Grid>
				</Grid>
			<DialogActions>
				<Button variant='contained' onClick={toggle} color='secondary'>Cancel</Button>
				<Button variant='contained' onClick={onConfirm}>Confirm</Button>
			</DialogActions>
		</Dialog>
	)
}

UploadDialog.defaultProps = {
	onConfirm		: ()=>{}
}
export default UploadDialog
