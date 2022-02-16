import {combineReducers} from '@reduxjs/toolkit';
import authentication from './authentication/authentication.slice';
// import dataManagement from './data-management/data-management.slice';
// import contractTariff from './contract-tariff/contract-tariff.slice';
// import select from './select/select.slice';
// import filters from './filters/filters.slice';
// import draftBill from './draft-bill/draft-bill.slice';
// import dataUpload from './data-upload';
// import dataDownload from './data-download';
// import roles from './roles';
// import user from './user'

const combinedReducers = combineReducers({
    auth:           authentication
    // select:         select,
    // dataManagement: dataManagement,
    // contractTariff: contractTariff,
    // filters:        filters,
    // draftBill,
    // dataUpload,
    // dataDownload,
    // roles,
    // user
})

const rootReducer = (state,action) => {
    if(action.type === 'authentication/sign-out/fulfilled')
        state={}
    return combinedReducers(state,action)
}

export default rootReducer
