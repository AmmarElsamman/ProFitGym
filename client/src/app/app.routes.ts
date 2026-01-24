import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { ClientList } from '../features/client/client-list/client-list';
import { ClientDetailed } from '../features/client/client-detailed/client-detailed';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'clients', component: ClientList, canActivate: [authGuard] },
    { path: 'clients/:id', component: ClientDetailed, canActivate: [authGuard] },
    { path: '**', component: Home },
];
