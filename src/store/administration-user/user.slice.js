import {createSlice} from '@reduxjs/toolkit';
import {postUser,getUser,getUserDetails,patchUser} from './user.thunk';

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
		[getUser.pending]:(state,action)=>{
			state.loading=true
		},
		[getUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getUser.rejected]:(state,action)=>{
			state.loading=false
		},
		[postUser.pending]:(state,action)=>{
			state.loading=true
		},
		[postUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postUser.rejected]:(state,action)=>{
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
		[patchUser.pending]:(state,action)=>{
			state.loading=true
		},
		[patchUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[patchUser.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {postUser,getUser,getUserDetails,patchUser}
export default slice.reducer