import { User } from '../../views/administration-user';
import { Role, RoleUpdate } from '../../views/administration-role';
import { Module } from '../../views/administration-module';
import { Report } from '../../views/administration-report';
import { ReasonCode } from '../../views/administration-reasoncode';

import { KairosReporthub } from '../../views/wms';
import { NykeDataSync,
	NykeConverter,
	NykeConvertedViewer,
	NykeReporthub } from '../../views/tms';
import { PlutusReporthub } from '../../views/fms';


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
		name:'kairos report hub',
		label:'Kairos Report Hub',
		route:'/wms/reporthub',
		module:'Warehouse Management',
		subModule:'kairos report hub',
		component:KairosReporthub
	},
	{
		name:'nyke report hub',
		label:'Nyke Report Hub',
		route:'/tms/reporthub',
		module:'Transport Management',
		subModule:'nyke report hub',
		component:NykeReporthub
	},
	{
		name:'nyke data sync',
		label:'Nyke Data Sync',
		route:'/tms/datasync',
		module:'Transport Management',
		subModule:'nyke data sync',
		component:NykeDataSync
	},
	{
		name:'nyke converter',
		label:'Nyke Converter',
		route:'/tms/converter',
		module:'Transport Management',
		subModule:'nyke converter',
		component:NykeConverter
	},
	{
		name:'nyke converter viewer',
		label:'Nyke Converter Viewer',
		route:'/tms/converterviewer',
		module:'Transport Management',
		subModule:'nyke converter viewer',
		component:NykeConvertedViewer
	},
	{
		name:'plutus report hub',
		label:'Plutus Report Hub',
		route:'/fms/reporthub',
		module:'Finance Management',
		subModule:'plutus report hub',
		component:PlutusReporthub
	},
	
]

export default routes;