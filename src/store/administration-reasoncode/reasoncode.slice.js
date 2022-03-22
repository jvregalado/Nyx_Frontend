import {createSlice} from '@reduxjs/toolkit';
import {postReasonCode,getReasonCode,getReasonCodeDetails,patchReasonCode} from './reasoncode.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'reasoncode',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[postReasonCode.pending]:(state,action)=>{
			state.loading=true
		},
		[postReasonCode.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postReasonCode.rejected]:(state,action)=>{
			state.loading=false
		},
		[getReasonCode.pending]:(state,action)=>{
			state.loading=true
		},
		[getReasonCode.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getReasonCode.rejected]:(state,action)=>{
			state.loading=false
		},
		[getReasonCodeDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[getReasonCodeDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getReasonCodeDetails.rejected]:(state,action)=>{
			state.loading=false
		},
		[patchReasonCode.pending]:(state,action)=>{
			state.loading=true
		},
		[patchReasonCode.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[patchReasonCode.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {postReasonCode,getReasonCode,getReasonCodeDetails,patchReasonCode}
export default slice.reducer