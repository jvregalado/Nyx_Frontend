import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '../../helpers/api';

const baseURL = '/auth'
const headers = {
		'Content-Type':'application/json',
}

const signIn = createAsyncThunk('authentication/sign-in',
	async({user_email,user_password}, {rejectWithValue}) => {
		try{
			const response = await API({
				requestHeaders : {
					...headers
				}
			}).post(`${baseURL}/token`,{
				user_email,
				user_password
			})

			return {
				user_email	:user_email,
				token		:response.data.token,
				role		:response.data.role
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

const changePassword = createAsyncThunk('authentication/change-password',
	async({route,data}, {rejectWithValue}) => {
		try{
			const res = await API({
				requestHeaders : {
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
			}).then(result => {
				if(result.status === 200){
					toast.success('Password Updated!')
				}
				return result
			})

			return res
		}
		catch(e){
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}

			return rejectWithValue(e)
		}
	}
)

export { signIn, signOut, changePassword }