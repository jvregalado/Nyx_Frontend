import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/module';
const headers = {
	'Content-Type':'application/json',
}

const postModule = createAsyncThunk('module/post',
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
					toast.success('Module Created!')
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

const getModule = createAsyncThunk('module/get',
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

const getModuleDetails = createAsyncThunk('module/getDetails',
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

const patchModule = createAsyncThunk('module/patch',
	async({route,data},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).patch(`${baseURL}/${route}`,{
				data
			})
			.then(result => {
				if(result.status === 200){
					toast.success('Module Updated!')
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

export { getModule, postModule, getModuleDetails, patchModule }
