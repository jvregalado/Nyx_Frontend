import {combineReducers} from '@reduxjs/toolkit';
import authentication from './authentication';

import user from './administration-user'
import role from './administration-role';
import modulE from './administration-module';
import report from './administration-report';
import reasoncode from './administration-reasoncode'

import select from './select';

import reporthub_wms from './reporthub_wms';
// import filters from './filters';
// import dataManagement from './data-management/data-management.slice';
// import contractTariff from './contract-tariff/contract-tariff.slice';
// import draftBill from './draft-bill/draft-bill.slice';
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

	reporthub_wms	:	reporthub_wms,
	// dataManagement	:	dataManagement,
	// contractTariff	:	contractTariff,
	// filters			:	filters,
	// draftBill,
	// dataUpload,
	// dataDownload
})

const rootReducer = (state,action) => {
	if(action.type === 'authentication/sign-out/fulfilled')
		state={}
	return combinedReducers(state,action)
}

export default rootReducer