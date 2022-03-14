import {createSlice} from '@reduxjs/toolkit';
import {createRole,getRole,getRoleDetails,updateRole} from './role.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'role',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[createRole.pending]:(state,action)=>{
			state.loading=true
		},
		[createRole.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createRole.rejected]:(state,action)=>{
			state.loading=false
		},
		[getRole.pending]:(state,action)=>{
			state.loading=true
		},
		[getRole.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getRole.rejected]:(state,action)=>{
			state.loading=false
		},
		[getRoleDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[getRoleDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getRoleDetails.rejected]:(state,action)=>{
			state.loading=false
		},
		[updateRole.pending]:(state,action)=>{
			state.loading=true
		},
		[updateRole.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[updateRole.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createRole,getRole,getRoleDetails,updateRole}
export default slice.reducer