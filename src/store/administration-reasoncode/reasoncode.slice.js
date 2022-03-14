import {createSlice} from '@reduxjs/toolkit';
import {createReasonCode,getReasonCode,getReasonCodeDetails,updateReasonCode} from './reasoncode.thunk';

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
		[createReasonCode.pending]:(state,action)=>{
			state.loading=true
		},
		[createReasonCode.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createReasonCode.rejected]:(state,action)=>{
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
		[updateReasonCode.pending]:(state,action)=>{
			state.loading=true
		},
		[updateReasonCode.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[updateReasonCode.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createReasonCode,getReasonCode,getReasonCodeDetails,updateReasonCode}
export default slice.reducer