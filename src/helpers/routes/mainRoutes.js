// import {PrincipalPage,PrincipalCreatePage,PrincipalEditPage} from '../../views/data-management/Principal';
// import {ShipPointPage,ShipPointCreate} from '../../views/data-management/ShipPoint';
// import {ItemMaster,ItemMasterCreate} from '../../views/data-management/ItemMaster'
// import {Geography} from '../../views/data-management/Geography';
// import {CreateQuickCode, QuickCode} from '../../views/data-management/QuickCode';
import {Users} from '../../views/user-management';
// import {Tariffs,CreateTariff} from '../../views/contract-tariff/Tariffs';
// import {CreateTariffType,TariffType} from '../../views/contract-tariff/Tariff-Type';
// import {Contracts,CreateContract,ContractDetails} from '../../views/contract-tariff/Contracts'
// import {Aggregation,AggregationCreate} from '../../views/contract-tariff/Aggre-Rule';
// import {DraftBill,DraftBillInvoice} from '../../views/draft-bill/DraftBills';
// import {RevenueLeaks} from '../../views/draft-bill/Leaks';
// import {Invoices} from '../../views/draft-bill/Invoices';
// import {Vendor} from '../../views/data-management/Vendor';
// import {Roles,CreateRole} from '../../views/administration/Roles';
// import {Transmittal} from '../../views/draft-bill/Transmittal'
const routes = [
    {
        path:'/data-management/principal',
        //component: PrincipalPage,
        routes:[
            {
                path:'/data-management/principal/create',
                //component: PrincipalCreatePage
            },
            {
                path:'/data-management/principal/edit',
                //component: PrincipalEditPage
            }
        ]
    },
    {
        path:'/data-management/ship-point',
        //component:ShipPointPage,
        routes:[
            {
                path:'/data-management/ship-point/create',
                //component: ShipPointCreate
            }
        ]
    },
    {
        path:'/data-management/item-master',
        //component:ItemMaster,
        routes:[
            {
                path:'/data-management/item-master/create',
                //component: ItemMasterCreate
            }
        ]
    },
    {
        path:'/data-management/quick-code',
        //component:QuickCode,
        routes:[
            {
                path:'/data-management/quick-code/create',
                //component: CreateQuickCode
            }
        ]
    },
    {
        path:'/data-management/geography',
        //component:Geography
    },
    {
        path:'/data-management/vendor',
        //component:Vendor
    },
    {
        path:'/administration/users',
        component:Users
    },
    // {
    //     path:'/administration/roles',
    //     component:Roles,
    //     routes:[
    //         {
    //             path:'/administration/roles/create',
    //             component: CreateRole
    //         }
    //     ]
    // }
]

export default routes;