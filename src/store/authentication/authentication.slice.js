import {createSlice} from '@reduxjs/toolkit';
import {signIn,signOut,changePassword} from './authentication.thunk';

const initialState = {
	user_email	:'',
	token		:'',
	role		:'',
	loading		:false
}

const slice = createSlice({
	name:'authentication',
	initialState,
	reducers:{
		resetAction:()=>initialState
	},
	extraReducers:{
		[signIn.pending]:(state,action)=>{
			state.loading=true
		},
		[signIn.fulfilled]:(state,action) => {
			state.user_email = action.payload.user_email
			state.token = action.payload.token
			state.role = action.payload.role
			state.loading=false
		},
		[signIn.rejected]:(state,action)=>{
			state.loading=false
		},
		[signOut.fulfilled]:(state,action) => {
			
		},
		[changePassword.pending]:(state,action)=>{
			state.loading=true
		},
		[changePassword.fulfilled]:(state,action)=>{
			state.loading=false
		},
		[changePassword.rejected]:(state,action)=>{
			state.loading=false
		},
	}
})

export {signIn,signOut,changePassword}
export default slice.reducer