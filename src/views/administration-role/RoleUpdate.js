import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Grid,
	Paper,
	Typography} from '@mui/material';
import {Toolbar} from '../../components/toolbar';
import {Input,Switch} from '../../components/inputs';
import {Spinner} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {getRole, getRoleDetails,putRoleDetails,patchRole} from '../../store/administration-role';
import {useQueryParams} from '../../helpers/hooks';

import RoleTable from './RoleTable';

const RoleUpdate = () => {
	const {loading} = useSelector(state => state.admin_role)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQueryParams();
	const role_code = query.get('role_code')
	const [state,setState] = React.useState([])
	const [headerState,setHeaderState] = React.useState({
		role_name		:'',
		role_status		:false,
		role_remarks1	:''
	})

	const onChangeHeader = (e,data) => {
		let temp = [...state]
		const index = state.map(item => item.module_code).indexOf(data.module_code)

		temp[index] = {
			...temp[index],
			role_module_status:e.target.checked,
			sub_modules: data.sub_modules.map(item => {

				return {
					...item,
					role_module_status:e.target.checked
				}
			})
		}
		setState(temp)
	}

	const handleInputChange = (e) => {
		setHeaderState({
			...headerState,
			[e.target.name]:e.target.value
		})
	}

	const handleSwitchChange = (e) => {
		setHeaderState({
			...headerState,
			[e.target.name]:e.target.checked
		})
	}

	const onConfirm= () =>{
		dispatch(patchRole({
			route:'',
			data:headerState
		}))
		dispatch(putRoleDetails({
			route:'assignment',
			data: state
		}))
	}

	React.useEffect(()=>{
		//console.log('role_code', role_code)

		if(role_code) {
			dispatch(getRole({
				route		: '',
				filters		: {role_code},
				page		: 0,
				totalPage	: 1,
			}))
			.unwrap()
			.then(result => {
				setHeaderState({
					...headerState,
					role_id			: result.data[0]?.role_id,
					role_code		: result.data[0]?.role_code,
					role_name		: result.data[0]?.role_name,
					role_status		: result.data[0]?.role_status,
					role_remarks1	: result.data[0]?.role_remarks1
				})
			})
		}

		if(role_code) {
			dispatch(getRoleDetails({
				route	: 'assignment',
				filters	: {role_code}
			}))
			.unwrap()
			.then(result => {
				// console.log('result',result.data[0])

				let pleyshodl = [];
				for(let i in result.data[0]) {
					pleyshodl.push({...result.data[0][i]})
				}

				let bugal = pleyshodl.reduce((acc, item) => {
					if(!acc[item.module_code]) {
						acc[item.module_code] = {
							'module_id'				: item.module_id,
							'module_code'			: item.module_code,
							'module_name'			: item.module_name,
							'role_module_status'	: item.role_module_status === 0 ? false : item.role_module_status || false,
							'role_id'				: item.role_id,
							'sub_modules' 			: [
								{	'report_code'	: item.report_code,
									'report_name'	: item.report_name
								}
							]
						}
					}
					else {
						acc[item.module_code].sub_modules.push({
							'report_code'	: item.report_code,
							'report_name'	: item.report_name
						})
					}
					return acc
				}, [])

				let pwe = Object.values(bugal);
				setState(pwe)
			})
		}
		// eslint-disable-next-line no-unused-expressions
		return () => { role_code }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[role_code])

	return (
		<Grid container rowSpacing={2}>
		<Spinner loading={loading} />
		<Grid item md={12}>
			<Toolbar
				label={'Roles / update'}
				isCancel
				isConfirm
				onCancel={()=>{
					navigate(-1)
				}}
				onConfirm={onConfirm}
			/>
		</Grid>
		<Grid item md={12}>
			<Grid item container component={Paper} variant='container' md={12}>
				<Grid item md={12}><Typography variant='button'>Role Information</Typography></Grid>
				<Input
					size={4}
					fullWidth
					isDisabled
					isLabelVisible
					label='Role Code'
					name='role_code'
					value={headerState.role_code}
					handleChange={handleInputChange}
				/>
				<Input
					size={5}
					isLabelVisible
					label='Role Name'
					name='role_name'
					value={headerState.role_name}
					handleChange={handleInputChange}
				/>
				<Grid item md={3}>
					<Switch
					isLabelVisible
					label='Status'
					name='role_status'
					checked={headerState.role_status}
					handleChange={handleSwitchChange}
				/>
				</Grid>
			</Grid>
		</Grid>
		<Grid item md={12}>
			<Grid item container component={Paper} variant='container' md={12}>
				<Grid item md={12}><Typography variant='button'>Roles</Typography></Grid>
				<Grid item md={12}>
					<RoleTable data={state} handleChangeHeader={onChangeHeader} />
				</Grid>
			</Grid>
		</Grid>
		{/* <Typography sx={{ color:'#CC6400' }} style={{cursor:"pointer"}} onClick={() => console.log("headerState",headerState)} >{'POKE ME'}</Typography> */}
	</Grid>
	);
}

export default RoleUpdate;