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
				route:'/administration/role',
				label:'Roles'
			},
			{
				name:'modules',
				route:'/administration/module',
				label:'Modules'
			},
			{
				name:'reports',
				route:'/administration/report',
				label:'Reports'
			},
			{
				name:'reasoncodes',
				route:'/administration/reasoncode',
				label:'Reason Codes'
			}
		]
	}
]

export default modules;