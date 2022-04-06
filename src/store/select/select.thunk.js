import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../helpers/api';
import {toast} from 'react-toastify';

const baseURL = '/select';
const headers = {
	'Content-Type':'application/json',
}

const getSelectData = createAsyncThunk('select/get',
	async({route,type,module_code},{rejectWithValue}) => {
		try{
			const res = await API({
				requestHeaders:{
					...headers
				}
			}).get(`${baseURL}/${route}/${type}`,{
				params:{
					module_code
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

export {getSelectData}