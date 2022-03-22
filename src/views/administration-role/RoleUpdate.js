

import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom';
import {Grid,
	Paper,
	Typography} from '@mui/material';
import {Toolbar} from '../../components/toolbar';
import {Input,Switch} from '../../components/inputs';
import {Spinner} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {upsertRoleDetails} from '../../store/administration-role';
import {useParams} from 'react-router';
import {useQueryParams} from '../../helpers/hooks'

// import RoleTable from './RoleTable';

const RoleUpdate = () => {
	const {loading} = useSelector(state => state.admin_role)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQueryParams();
	const location = useLocation();
	const [state,setState] = React.useState([])
	const [required,setRequired] = React.useState({
		role_code		:	null,
		role_name		:	null,
		role_status		:	false,
		role_remarks1	:	''
	})

	const onChangeHeader = (e,data) => {
		let temp = [...state]
		const index = state.map(item => item.name).indexOf(data.name)

		temp[index] = {
			...temp[index],
			has_access:e.target.checked,
			sub_modules: data.sub_modules.map(item => {

				return {
					...item,
					has_access:e.target.checked
				}
			})
		}
		setState(temp)
	}

	const onhandleSubChange = (e,module,data) => {
		const temp = [...state]
		const indexModule = state.map(item => item.name).indexOf(module)
		const indexSub = state[indexModule].sub_modules.map(item => item.name).indexOf(data.name)

		let sub_modules = temp[indexModule].sub_modules
		sub_modules[indexSub].has_access = e.target.checked

		temp[indexModule] = {
			...temp[indexModule],
			sub_modules
		}

		setState(temp)
	}

	const handleInputChange = (e) => {
		setRequired({
			...required,
			[e.target.name]:e.target.value
		})
	}

	const handleSwitchChange = (e) => {
		setRequired({
			...required,
			[e.target.name]:e.target.checked
		})
	}

	const onConfirm= () =>{
		const data = {
			...required,
			modules:state
		}
		dispatch(upsertRoleDetails({
			route:'upsert',
			data
		}))
	}

	React.useEffect(()=>{
		// console.log(location)
		// console.log(par.search)
		console.log(query.get('role_code'))
		// setState(modules.map(header => {
		// 	const sub_modules = header.subModules.map(sub => {
		// 		return {
		// 			name:sub.name,
		// 			label:sub.label,
		// 			route:sub.route,
		// 			has_access:false
		// 		}
		// 	})
			
		// 	return {
		// 		name:header.name,
		// 		label:header.name,
		// 		route:header.route,
		// 		has_access:false,
		// 		sub_modules
		// 	}
		// }))
	},[])

	return (
		<Grid container rowSpacing={2}>
		<Spinner loading={loading} />
		<Grid item md={12}>
			<Toolbar
				isCancel
				isConfirm
				onCancel={()=>{
					navigate.goBack()
				}}
				onConfirm={onConfirm}
			/>
		</Grid>
		<Grid item md={12}>
			<Grid item container component={Paper}  variant='container' md={12}>
				<Grid item md={12}><Typography variant='button'>Role Information</Typography></Grid>
				<Input
					isLabelVisible
					label='Role Name'
					name='role_name'
					size={6}
					value={required.role_name || 'asd'}
					handleChange={handleInputChange}
				/>
				<Grid item md={6}>
					<Switch
					isLabelVisible
					label='Status'
					name='status'
					checked={required.status}
					handleChange={handleSwitchChange}
				/>
				</Grid>
			</Grid>
		</Grid>
		<Grid item md={12}>
			<Grid item container component={Paper}  variant='container' md={12}>
				<Grid item md={12}><Typography  variant='button'>Roles</Typography></Grid>
				<Grid item md={12}>
					{/* <RoleTable columns={['MODULES','ACCESS']} data={state} handleChangeHeader={onChangeHeader} handleSubChange={onhandleSubChange}/> */}
				</Grid>
			</Grid>
		</Grid>
	</Grid>
		// <Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log('xxx')} >{'SAMPLE'}</Typography>
	);
}

export default RoleUpdate;