import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/CountryLayout/CountryLayout.component'),
        children: [
            {
                path: 'by-capital',
                loadComponent: () => import('./pages/by-capital-page/by-capital-page.component')
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default countryRoutes;