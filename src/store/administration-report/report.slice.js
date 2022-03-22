import {createSlice} from '@reduxjs/toolkit';
import {postReport,getReport,getReportDetails,patchReport} from './report.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'report',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[postReport.pending]:(state,action)=>{
			state.loading=true
		},
		[postReport.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postReport.rejected]:(state,action)=>{
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
		[getReportDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[getReportDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getReportDetails.rejected]:(state,action)=>{
			state.loading=false
		},
		[patchReport.pending]:(state,action)=>{
			state.loading=true
		},
		[patchReport.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[patchReport.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {postReport,getReport,getReportDetails,patchReport}
export default slice.reducer