import {createSlice} from '@reduxjs/toolkit';
import {signIn,signOut} from './authentication.thunk';

const slice = createSlice({
	name:'authentication',
	initialState:{
		email:'',
		token:'',
		role:''
	},
	reducers:{

	},
	extraReducers:{
		[signIn.fulfilled]:(state,action) => {
			state.email	 = action.payload.email
			state.token		  = action.payload.token
		},
		[signOut.fulfilled]:(state,action) => {
			
		}

	}
})

export {signIn,signOut}
export default slice.reducer