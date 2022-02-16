const modules = [
    {
        name:'data-management',
        label:'Data Management',
        route:'/data-management',
        subModules:[
            {
                name:'item-master',
                route:'/data-management/item-master',
                label:'Item Master',
            },
            {
                name:'principal',
                route:'/data-management/principal',
                label:'Principal'
            },
            {
                name:'customer',
                route:'/data-management/customer',
                label:'Customers'
            },
            {
                name:'vendor',
                route:'/data-management/vendor',
                label:'Vendors'
            },
            {
                name:'ship-point',
                route:'/data-management/ship-point',
                label:'Ship Points'
            },
            {
                name:'quick-code',
                route:'/data-management/quick-code',
                label:'Quick Code'
            },
            {
                name:'location',
                route:'/data-management/location',
                label:'Locations'
            },
            {
                name:'geography',
                route:'/data-management/geography',
                label:'Geography'
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