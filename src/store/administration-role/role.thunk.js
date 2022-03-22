import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/role';
const headers = {
	'Content-Type':'application/json',
}

const createRole = createAsyncThunk('role/create',
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
					toast.success('Role Created!')
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

const getRole = createAsyncThunk('role/get',
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

const getRoleDetails = createAsyncThunk('role/get/post',
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

const updateRole = createAsyncThunk('role/update',
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
					toast.success('Role Updated!')
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

const upsertRoleDetails = createAsyncThunk('role/put',
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
					toast.success('Role Updated!')
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

export { getRole, createRole, getRoleDetails, updateRole, upsertRoleDetails }
