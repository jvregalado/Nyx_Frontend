import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/tms';
const headers = {
	'Content-Type':'application/json',
}

const getReportCodes = createAsyncThunk('tms-datasync-sourceCode/get',
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

const postSync = createAsyncThunk('tms-datasync/post',
	async({route,data},{rejectWithValue})=>{
		try{
			let res;

			res = await API({
				requestHeaders:{
					...headers
				}
			}).post(`${baseURL}/${route}`,{
				data
			})
			.then(result => {
				// console.log('result',result)
				let register = result.data.log_Detail.reduce((acc, cur) => {
					return acc.concat(` ${cur?.datasync_master_table}: ${cur?.datasync_row_data}`)
				},`Sync sucessful!`);

				if(result.status === 200){
					toast.success(register)
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

const getDataSyncLog = createAsyncThunk('tms-datasync/getLogs',
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

export { getReportCodes, postSync, getDataSyncLog }