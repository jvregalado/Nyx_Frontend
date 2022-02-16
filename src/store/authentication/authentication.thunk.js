import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '../../helpers/api';

const baseURL = '/auth'
const headers = {
		'Content-Type':'application/json',
}

const signIn = createAsyncThunk('authentication/sign-in',
	async({email,password}, {rejectWithValue}) => {
		try{
			const response = await API({
				requestHeaders : {
					...headers
				}
			}).post(`${baseURL}/token`,{
				email,
				password
			})

			return {
				token:response.data.token,
				// modules:response.data.modules,
				email:email
			}
		}
		catch(e){
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}

			return rejectWithValue(e)
		}
	}
)

const signOut = createAsyncThunk('authentication/sign-out',
	async(props,{rejectWithValue})=>{
		try{
			await API({
					requestHeaders:{
							...headers
					}
			})
			.post(`${baseURL}/sign-out`)
		}
		catch(e){
			console.log(e)
			if(e.response && e.response.data){
					toast.error(`${e.response.data.message}`)
			}

			return rejectWithValue(e)
		}
	}
)

export { signIn, signOut }