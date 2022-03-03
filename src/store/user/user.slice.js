import {createSlice} from '@reduxjs/toolkit';
import {createUser,getUser,getUserDetails,updateUser} from './user.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'user',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[createUser.pending]:(state,action)=>{
			state.loading=true
		},
		[createUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createUser.rejected]:(state,action)=>{
			state.loading=false
		},
		[getUser.pending]:(state,action)=>{
			state.loading=true
		},
		[getUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getUser.rejected]:(state,action)=>{
			state.loading=false
		},
		[getUserDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[getUserDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getUserDetails.rejected]:(state,action)=>{
			state.loading=false
		},
		[updateUser.pending]:(state,action)=>{
			state.loading=true
		},
		[updateUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[updateUser.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createUser,getUser,getUserDetails,updateUser}
export default slice.reducer