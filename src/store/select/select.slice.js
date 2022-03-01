import {createSlice} from '@reduxjs/toolkit';
import {getSelectData} from './select.thunk';

const slice = createSlice({
	name:'select',
	initialState:{
		country :null,
		loading:false
	},
	reducers:{
		setSelected: (state,action)=> {
			state[action.payload.variant] = action.payload.value
		}
	},
	extraReducers:{
		[getSelectData.pending]:(state,action) => {
			state.loading = true
		},
		[getSelectData.fulfilled]:(state,action) => {
			state.loading = false
		},
		[getSelectData.rejected]:(state,action) => {
			state.loading = false
		}
	}
})

export default slice.reducer;
export const {setSelected} = slice.actions;
export {getSelectData}