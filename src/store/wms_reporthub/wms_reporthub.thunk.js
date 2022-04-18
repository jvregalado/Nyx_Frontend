import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/wms';
const headers = {
	'Content-Type':'application/json',
}

const getReportCodes = createAsyncThunk('wms-report-sourceCode/get',
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

const getReport = createAsyncThunk('wms-report/post',
	async({route,data},{rejectWithValue})=>{
		try{
			let res;
			if(data.report === null || typeof data.report.value !== 'string') {
				toast.error('No report selected!')
			}
			else {
				res = await API({
					requestHeaders:{
						...headers
					}
				}).post(`${baseURL}/${route}`,{
					data
				})
			}

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

export { getReportCodes, getReport }