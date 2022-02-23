import {createSlice} from '@reduxjs/toolkit';
import {createUser,getUser} from './user.thunk';

const initialState = {
	loading:false
}

const slice = createSlice({
	name:'user',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[createUser.pending]:(state,action)=>{
			state.loading=true
		},
		[createUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[createUser.rejected]:(state,action)=>{
			state.loading=false
		},
		[getUser.pending]:(state,action)=>{
			state.loading=true
		},
		[getUser.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[getUser.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {createUser,getUser}
export default slice.reducer