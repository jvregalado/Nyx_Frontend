import {createSlice} from '@reduxjs/toolkit';
import {createModule,getModule,getModuleDetails,updateModule} from './module.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'module',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[createModule.pending]:(state,action)=>{
			state.loading=true
		},
		[createModule.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createModule.rejected]:(state,action)=>{
			state.loading=false
		},
		[getModule.pending]:(state,action)=>{
			state.loading=true
		},
		[getModule.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getModule.rejected]:(state,action)=>{
			state.loading=false
		},
		[getModuleDetails.pending]:(state,action)=>{
			state.loading=true
		},
		[getModuleDetails.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getModuleDetails.rejected]:(state,action)=>{
			state.loading=false
		},
		[updateModule.pending]:(state,action)=>{
			state.loading=true
		},
		[updateModule.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[updateModule.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createModule,getModule,getModuleDetails,updateModule}
export default slice.reducer