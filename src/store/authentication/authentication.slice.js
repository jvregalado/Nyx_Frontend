import {createSlice} from '@reduxjs/toolkit';
import {signIn,signOut,changePassword} from './authentication.thunk';

const initialState = {
	user_email	:'',
	token		:'',
	role		:'',
	has_wbs		:false,	
	system      :'',	
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

			if(action.payload.has_wbs && action.payload.system === 'WBS'){
				state.loading	= false
				return window.location.replace(`${process.env.REACT_APP_WBS_LINK}auth?token=${action.payload.token.token}&expiry=${action.payload.token.expiry}`)
			}	

			state.user_email = action.payload.user_email
			state.token 	= action.payload.token
			state.role 		= action.payload.role
			state.has_wbs	= action.payload.has_wbs
			state.system 	= action.payload.system
			state.loading	= false
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