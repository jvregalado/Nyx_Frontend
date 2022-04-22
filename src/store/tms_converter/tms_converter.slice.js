import {createSlice} from '@reduxjs/toolkit';
import {getReportCodes,getReport, postUpload} from './tms_converter.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'tms_converter',
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
		[postUpload.pending]:(state,action)=>{
			state.loading=true
		},
		[postUpload.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postUpload.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {getReportCodes,getReport,postUpload}
export default slice.reducer