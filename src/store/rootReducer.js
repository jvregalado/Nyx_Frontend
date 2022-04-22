import {combineReducers} from '@reduxjs/toolkit';
import authentication from './authentication';

import user from './administration-user'
import role from './administration-role';
import modulE from './administration-module';
import report from './administration-report';
import reasoncode from './administration-reasoncode'

import select from './select';

import wms_reporthub from './wms_reporthub';
import tms_converter from './tms_converter';
// import filters from './filters';
// import dataUpload from './data-upload';
// import dataDownload from './data-download';

const combinedReducers = combineReducers({
	auth			:	authentication,

	admin_user		:	user,
	admin_role		:	role,
	admin_module	:	modulE,
	admin_report	:	report,
	admin_reasoncode:	reasoncode,

	select			:	select,

	wms_reporthub	:	wms_reporthub,
	tms_converter	:	tms_converter
	// dataManagement	:	dataManagement,
	// filters			:	filters,
})

const rootReducer = (state,action) => {
	if(action.type === 'authentication/sign-out/fulfilled')
		state={}
	return combinedReducers(state,action)
}

export default rootReducer