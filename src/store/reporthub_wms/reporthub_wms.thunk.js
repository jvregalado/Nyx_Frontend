import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/reporthub';
const headers = {
	'Content-Type':'application/json',
}

const getReport = createAsyncThunk('reporthub/get',
	async({route,data},{rejectWithValue})=>{
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}`,{
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

// const getUser = createAsyncThunk('user/get',
// 	async({route,page,totalPage,orderBy,filters},{rejectWithValue})=>{
// 		try{
// 			const res = await API({
// 				requestHeaders:{
// 					...headers
// 				}
// 			}).get(`${baseURL}/${route}`,{
// 				params:{
// 					page,
// 					totalPage,
// 					orderBy,
// 					...filters
// 				}
// 			})

// 			return res.data
// 		}
// 		catch(e){
// 			if(e.response && e.response.data){
// 				toast.error(`${e.response.data.message}`)
// 			}
// 			return rejectWithValue(e)
// 		}
// 	}
// )

export { getReport }