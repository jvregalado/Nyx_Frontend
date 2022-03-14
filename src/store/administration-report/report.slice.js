import {createSlice} from '@reduxjs/toolkit';
import {createReport,getReport,getReportDetails,updateReport} from './report.thunk';

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
		[createReport.pending]:(state,action)=>{
			state.loading=true
		},
		[createReport.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createReport.rejected]:(state,action)=>{
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
		[updateReport.pending]:(state,action)=>{
			state.loading=true
		},
		[updateReport.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[updateReport.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createReport,getReport,getReportDetails,updateReport}
export default slice.reducer