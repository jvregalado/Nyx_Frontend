import Users from '../../views/user-management/Users';

const routes = [
	{
		name:'users',
		label:'Users',
		route:'/administration/users',
		module:'Administration',
		subModule:'Users',
		component:Users
	}
]

export default routes;