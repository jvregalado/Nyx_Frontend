import {createSlice} from '@reduxjs/toolkit';
import {getReport} from './reporthub_wms.thunk';

const initialState = {
	loading:false,
	reportId:null,
	whseLocation:null,
	dateFrom:null,
	dateTo:null
}

const slice = createSlice({
	name:'reporthub_wms',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
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

export {getReport}
export default slice.reducer