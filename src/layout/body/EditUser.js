import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Grid,
  Button,
  TextField,
  Dialog,
DialogTitle,
DialogContent,
DialogContentText,
FormControlLabel,
Checkbox,
DialogActions} from '@mui/material'
import { toast } from 'react-toastify';
import Axios from 'axios';

Axios.defaults.withCredentials = true;

let URL;

if(process.env.NODE_ENV === 'development'){
	URL = process.env.REACT_APP_API_DEV
}
else {
	URL = process.env.REACT_APP_API
}

export default function DataGridDemo() {

const [rows, setRows] = React.useState({});

const searchEngine = () =>{
  const sb = document.getElementById('txtsearchE').value;
  Axios.post(`${URL}user/login/viewuser/`,{
	searchBar: sb
}).then((res)=>{
	console.log(res.data.searchUser);
	setRows(res.data.searchUser)
}).catch((er)=>{
	return toast.error(`${er.response.data.message}`);
}
);
}

const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const [stateOpen, setOpen] = React.useState(false);
const [stateUpdate, setUpdate] = React.useState({
  txtFirstName:'',
  txtLastName:'',
  txtSuffix:'',
  txtContact:'',
  txtEmail:'',
  txtStatus: false,
  txtAdmin: false,
  txtID:''
});
const toUpdateDetails = () =>{
  console.log(stateUpdate);
	const f = stateUpdate.txtFirstName;
	const l = stateUpdate.txtLastName;
	if(f===""||l===""){
		return toast.error(`Please check for the required fields`);
	}
	else{
	  Axios.post(`${URL}user/login/updateuserdetails/`,{
		uEmail_add: stateUpdate.txtEmail,
		uID: stateUpdate.txtID,
		uFirst_name: f,
		uLast_name: l,
		uContact: stateUpdate.txtContact,
		uStatus: stateUpdate.txtStatus,
		uAdmin: stateUpdate.txtAdmin,
		uSuffix: stateUpdate.txtSuffix,
		id:userDetails.id
	}).then((res)=>{
		closeUpdateDetails();
		searchEngine();
		return toast.success(`User datails has been changed!`);
	}).catch((e)=>{
	  console.log(e)
		return toast.error(`${e.response}`);
	})
}
}
const closeUpdateDetails = ()=>{
  setUpdate({
	txtFirstName:'',
	txtLastName:'',
	txtSuffix:'',
	txtContact:'',
	txtEmail:'',
	txtStatus: false,
	txtAdmin: false
  });
  setOpen(false);
}

const renderDetailsButton = (params) => {
  return (
	  <strong>
		  <Button
			  variant="contained"
			  color="primary"
			  size="small"
			  style={{ marginLeft: 16 }}
			  onClick={() => {
				setUpdate({
				  txtFirstName:params.row.first_name,
				  txtLastName:params.row.last_name,
				  txtSuffix:params.row.suffix,
				  txtContact:params.row.contactNo,
				  txtEmail:params.row.email_add,
				  txtID: params.row.id,
				  txtStatus: Boolean(params.row.userStatus),
				  txtAdmin: Boolean(params.row.userAdmin)
				});
				setOpen(true)
			  }}
		  >
			  Edit
		  </Button>
	  </strong>
  )
}
const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
	field: 'id',
	headerName: '',
	width: 100,
	renderCell: renderDetailsButton,
	disableClickEventBubbling: true,
},
  {
	field: 'first_name',
	headerName: 'First name',
	width: 150
  },
  {
	field: 'last_name',
	headerName: 'Last name',
	width: 150
  },
  {
	field: 'suffix',
	headerName: 'Suffix',
	width: 70
  },
  {
	field: 'contactNo',
	headerName: 'Contact',
	width: 150
  },
  {
	field: 'email_add',
	headerName: 'Email Address',
	width: 200
  },
  {
	field: 'userStatus',
	headerName: 'Status',
	width: 75,
	type: 'boolean'
  },
  {
	field: 'userAdmin',
	headerName: 'Admin',
	width: 75,
	type: 'boolean'
  },
  {
	field: 'createdBy',
	headerName: 'Created by',
	width: 150
  },
  {
	field: 'createdAt',
	headerName: 'Created at',
	width: 150,
	type: 'dateTime'
  },
  {
	field: 'updatedBy',
	headerName: 'Updated by',
	width: 150
  },
  {
	field: 'updatedAt',
	headerName: 'Updated at',
	width: 150,
	type: 'dateTime'
  },
];

  return (
	
	<Grid container>
	  
	  <Dialog open={stateOpen} onClose={closeUpdateDetails}>
		<DialogTitle>User details</DialogTitle>
		<DialogContent>
		  <DialogContentText>
			Update user details
		  </DialogContentText>
		  <TextField
			autoFocus
			margin="dense"
			id="txtFirstName"
			label="First Name"
			fullWidth
			variant="standard"
			required
			value={stateUpdate.txtFirstName}
			onChange={(e)=>{
			  setUpdate({
				  ...stateUpdate,
				  txtFirstName:e.target.value
			  })
		  }}
		  />
		  <TextField
			autoFocus
			margin="dense"
			id="txtLastName"
			label="Last Name"
			fullWidth
			variant="standard"
			required
			value={stateUpdate.txtLastName}
			onChange={(e)=>{
			  setUpdate({
				  ...stateUpdate,
				  txtLastName:e.target.value
			  })
		  }}
		  />
		<TextField
			autoFocus
			margin="dense"
			id="txtSuffix"
			label="Suffix"
			fullWidth
			variant="standard"
			value={stateUpdate.txtSuffix}
			onChange={(e)=>{
			  setUpdate({
				  ...stateUpdate,
				  txtSuffix:e.target.value
			  })
		  }}
		  />
		  <TextField
			  autoFocus
			  margin="dense"
			  id="txtEmail"
			  label="Email Address"
			  fullWidth
			  disabled={true}
			  variant="standard"
			  value={stateUpdate.txtEmail}
			  onChange={(e)=>{
				setUpdate({
					...stateUpdate,
					txtEmail:e.target.value
				})
			}}
			/>
			
	  <FormControlLabel
  control={
	<Checkbox
	  name="chbStatus"
	  color="primary"
	  checked={stateUpdate.txtStatus} 
	/>
  }
  label="Status"  
	  
  onChange={(e)=>{
	  setUpdate({
		  ...stateUpdate,
		  txtStatus:e.target.checked
	  });
  }}
/>
			<FormControlLabel
		control={
		  <Checkbox
			name="chbAdmin"
			color="primary" 
			checked={stateUpdate.txtAdmin}
		  />
		}
		label="Admin"  
			
		onChange={(e)=>{
			setUpdate({
				...stateUpdate,
				txtAdmin:e.target.checked
			});
			console.log(stateUpdate)
		}}
	  />
		</DialogContent>
		<DialogActions>
		  <Button onClick={closeUpdateDetails}>Cancel</Button>
		  <Button onClick={toUpdateDetails}>Update</Button>
		</DialogActions>
	  </Dialog>
	  <TextField
			autoFocus
			margin="dense"
			id="txtsearchE"
			label="Search bar"
			fullWidth
			variant="standard"
			onChange={searchEngine}
			onKeyPress={event => {
			  if (event.key === 'Enter') {
				searchEngine()
			  }
			}}
		  />
	   <div style={{ height: 400, width: '100%' }}>
	<DataGrid
	  rows={rows}
	  columns={columns}
	  pageSize={5}
	  rowsPerPageOptions={[5]}
	  filterMode="server"
  onFilterModelChange={searchEngine}
	/>
	</div>
  </Grid>
  );
}