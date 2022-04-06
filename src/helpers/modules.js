const modules = [
	{
		name:'wms',
		label:'Warehouse Management',
		route:'/wms',
		subModules:[
			{
				name:'kairos report hub',
				route:'/wms/reporthub',
				label: 'Kairos Report hub'
			},
			{
				name:'kairos converter hub',
				route:'/wms/converter',
				label: 'Kairos Converter hub'
			},
			{
				name:'kairos dashboard',
				route:'/wms/dashboard',
				label:'Kairos Dashboard'
			},
			{
				name:'kairos interface',
				route:'/wms/interface',
				label:'Kairos Interface'
			},
		]
	},
	{
		name:'tms',
		label:'Transport Management',
		route:'/tms',
		subModules:[
			{
				name:'nyke reporthub',
				route:'/tms/reporthub',
				label: 'Nyke Reporthub'
			},
			{
				name:'nyke data sync',
				route:'/tms/sync',
				label:'Nyke Data Sync'
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