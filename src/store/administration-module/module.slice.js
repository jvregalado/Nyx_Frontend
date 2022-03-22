import {createSlice} from '@reduxjs/toolkit';
import {postModule,getModule,getModuleDetails,patchModule} from './module.thunk';

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
		[postModule.pending]:(state,action)=>{
			state.loading=true
		},
		[postModule.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[postModule.rejected]:(state,action)=>{
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
		[patchModule.pending]:(state,action)=>{
			state.loading=true
		},
		[patchModule.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[patchModule.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {postModule,getModule,getModuleDetails,patchModule}
export default slice.reducer