const modules = [
	{
		name:'reporthub',
		label:'Report hub',
		route:'/reporthub',
		subModules:[
			{
				name:'WMS',
				route:'/reporthub/wms',
				label: 'WMS'
			},
			{
				name:'TMS',
				route:'/reporthub/tms',
				label:'TMS'
			}
		]
	},
	{
		name:'administration',
		label:'Administration',
		route:'/administration',
		subModules:[
			{
				name:'users',
				route:'/administration/user',
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