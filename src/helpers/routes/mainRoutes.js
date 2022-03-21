import { User } from '../../views/administration-user';
import { Role, RoleUpdate } from '../../views/administration-role';
import { Module } from '../../views/administration-module';
import { Report } from '../../views/administration-report';
import { ReasonCode } from '../../views/administration-reasoncode';
import { ReportHub_wms } from '../../views/reporthub/wms';

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
		name:'roles',
		label:'Roles',
		route:'/administration/role',
		module:'Administration',
		subModule:'Roles',
		component:Role
	},
	{
		name:'roles_update',
		label:'Roles Update',
		route:'/administration/role/update',
		module:'Administration',
		subModule:'Roles',
		component:RoleUpdate
	},
	{
		name:'modules',
		label:'Modules',
		route:'/administration/module',
		module:'Administration',
		subModule:'Modules',
		component:Module
	},
	{
		name:'reports',
		label:'Reports',
		route:'/administration/report',
		module:'Administration',
		subModule:'Reports',
		component:Report
	},
	{
		name:'reasoncode',
		label:'Reason Code',
		route:'/administration/reasoncode',
		module:'Administration',
		subModule:'ReasonCodes',
		component:ReasonCode
	},
	{
		name:'reporthub',
		label:'Report Hub',
		route:'/reporthub/wms',
		module:'Report Hub',
		subModule:'WMS',
		component:ReportHub_wms
	},
]

export default routes;