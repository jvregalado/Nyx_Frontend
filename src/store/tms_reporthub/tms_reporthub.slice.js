import {createSlice} from '@reduxjs/toolkit';
import {getReportCodes,getReport} from './tms_reporthub.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'tms_reporthub',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[getReportCodes.pending]:(state,action)=>{
			state.loading=true
		},
		[getReportCodes.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getReportCodes.rejected]:(state,action)=>{
			state.loading=false
		},
		[getReport.pending]:(state,action)=>{
			state.loading=true
		},
		[getReport.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getReport.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {getReportCodes,getReport}
export default slice.reducer