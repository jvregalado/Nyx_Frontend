import {createSlice} from '@reduxjs/toolkit';
import {getReportCodes,getReport,getDataSync} from './tms_datasync.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'tms_datasync',
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
		[getDataSync.pending]:(state,action)=>{
			state.loading=true
		},
		[getDataSync.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getDataSync.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {getReportCodes,getReport,getDataSync}
export default slice.reducer