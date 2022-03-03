import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/user';
const headers = {
	'Content-Type':'application/json',
}

const createUser = createAsyncThunk('user/create',
	async({route,data},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
			})
			.then(result => {
				if(result.status === 200){
					toast.success('User Created!')
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

const getUser = createAsyncThunk('user/get',
	async({route,page,totalPage,orderBy,filters},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}`,{
				params:{
					page,
					totalPage,
					orderBy,
					...filters
				}
			})

			return res.data
		}
		catch(e){
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}
			return rejectWithValue(e)
		}
	}
)

const getUserDetails = createAsyncThunk('user/get/post',
	async({route,filters},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}`,{
				params:{
					...filters
				}
			})

			return res.data
		}
		catch(e){
			if(e.response && e.response.data){
				toast.error(`${e.response.data.message}`)
			}
			return rejectWithValue(e)
		}
	}
)

const updateUser = createAsyncThunk('user/update',
	async({route,data},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
			})
			.then(result => {
				if(result.status === 200){
					toast.success('User Updated!')
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

export { getUser, createUser, getUserDetails, updateUser }
