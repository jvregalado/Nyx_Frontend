import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/report';
const headers = {
	'Content-Type':'application/json',
}

const postReport = createAsyncThunk('report/post',
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
					toast.success('Report Created!')
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

const getReport = createAsyncThunk('report/get',
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

const getReportDetails = createAsyncThunk('report/getDetails',
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

const patchReport = createAsyncThunk('report/patch',
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
					toast.success('Report Updated!')
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

export { postReport, getReport, getReportDetails, patchReport }
