const modules = [
	{
		name:'administration',
		label:'Administration',
		route:'/administration',
		subModules:[
			{
				name:'users',
				route:'/administration/users',
				label: 'Users'
			},
			{
				name:'roles',
				route:'/administration/roles',
				label:'Roles'
			}
		]
	}
]

export default modules;