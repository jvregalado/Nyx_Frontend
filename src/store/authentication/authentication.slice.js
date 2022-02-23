import {createSlice} from '@reduxjs/toolkit';
import {signIn,signOut} from './authentication.thunk';

const slice = createSlice({
	name:'authentication',
	initialState:{
		user_email:'',
		token:'',
		role:''
	},
	reducers:{

	},
	extraReducers:{
		[signIn.fulfilled]:(state,action) => {
			state.user_email = action.payload.user_email
			state.token = action.payload.token
		},
		[signOut.fulfilled]:(state,action) => {
			
		}
	}
})

export {signIn,signOut}
export default slice.reducer