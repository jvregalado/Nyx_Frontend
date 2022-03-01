import User from '../../views/user-management/User';
import ReportHub_wms from '../../views/reporthub/wms/reporthub_wms';

const routes = [
	{
		name:'users',
		label:'Users',
		route:'/administration/user',
		module:'Administration',
		subModule:'Users',
		component:User
	},
	{
		name:'reporthub',
		label:'Report Hub',
		route:'/reporthub/wms',
		module:'Report Hub',
		subModule:'WMS',
		component:ReportHub_wms
	}
]

export default routes;