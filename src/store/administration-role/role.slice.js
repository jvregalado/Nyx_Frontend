import {createSlice} from '@reduxjs/toolkit';
import {postRole,getRole,getRoleDetails,patchRole,putRoleDetails} from './role.thunk';

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
		[postRole.pending]:(state,action)=>{
			state.loading=true
		},
		[postRole.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postRole.rejected]:(state,action)=>{
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
		[patchRole.pending]:(state,action)=>{
			state.loading=true
		},
		[patchRole.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[patchRole.rejected]:(state,action)=>{
			state.loading=false
		},
		[putRoleDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[putRoleDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[putRoleDetails.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {postRole,getRole,getRoleDetails,patchRole,putRoleDetails}
export default slice.reducer