import {createSlice} from '@reduxjs/toolkit';
import {getReportCodes,postSync,getDataSyncLog} from './tms_datasync.thunk';

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
		[postSync.pending]:(state,action)=>{
			state.loading=true
		},
		[postSync.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postSync.rejected]:(state,action)=>{
			state.loading=false
		},
		[getDataSyncLog.pending]:(state,action)=>{
			state.loading=true
		},
		[getDataSyncLog.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getDataSyncLog.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {getReportCodes,postSync,getDataSyncLog}
export default slice.reducer