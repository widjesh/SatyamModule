import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                //translate: 'NAV.DASHBOARDS',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/dashboards/project'
            },
            {
                id: 'calendar',
                title: 'Calendar',
                //translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'today',
                url: '/apps/calendar'
            },
            {
                id: 'customers',
                title: 'Customer',
                //translate: 'NAV.ECOMMERCE',
                type: 'collapsable',
                icon: 'shopping_cart',
                children: [
                    {
                        id: 'RegisterCustomer',
                        title: 'Register User',
                        type: 'item',
                        url: '/apps/e-commerce/products/1/printed-dress',
                        exactMatch: true
                    },
                    {
                        id: 'Manage',
                        title: 'Manage Customer',
                        type: 'item',
                        url: '/apps/e-commerce/products',
                        exactMatch: true
                    }
                ]
            },
            {
                id: 'Admin',
                title: 'Adminstration',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'Register User',
                        title: 'Register User',
                        type: 'item',
                        url: 'pages/auth/register',
                        exactMatch: true
                    },
                    {
                        id: 'ManageUsers',
                        title: 'Manage Users',
                        type: 'item',
                        url: '/apps/e-commerce/products',

                        exactMatch: true
                    }
                ]
            },
        ]
    }
];
