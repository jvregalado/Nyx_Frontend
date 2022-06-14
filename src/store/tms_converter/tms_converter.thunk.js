import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';
//import axios from 'axios';

const baseURL = '/tms';
const headers = {
	'Content-Type':'application/json',
}

const getReportCodes = createAsyncThunk('tms-converter-sourceCode/get',
	async({route,report_id},{rejectWithValue})=>{
		try{

			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}/report-sourcecode`,{
				params:{
					report_id
				}
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


const getReport = createAsyncThunk('tms-converter/post',
	async({route,data},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
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



const getRTVDetails = createAsyncThunk('rtv/getDetails',
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

const getRTVview = createAsyncThunk('rtv/get',
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

const postUpload = createAsyncThunk('tms-converter/post',
	async({route,data},{rejectWithValue})=>{
		// console.log(`${baseURL}/${route}`);
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
					toast.success('Successfully Uploaded!')
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
const postGenerate = createAsyncThunk('tms-converter/post',
	async({route,data},{rejectWithValue})=>{
		// console.log(`${baseURL}/${route}`);
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
			})
			.then(result => {
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

export { getReportCodes, getReport, postUpload,postGenerate,getRTVview,getRTVDetails }