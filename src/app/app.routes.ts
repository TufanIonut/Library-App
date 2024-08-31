import { Routes } from '@angular/router';
import { authorizeGuard } from '../_core/guards/authorize.guard';
export const routes: Routes = [
    {
        path: '', pathMatch: 'full',
        redirectTo: '/auth/login'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

    },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    },
];
