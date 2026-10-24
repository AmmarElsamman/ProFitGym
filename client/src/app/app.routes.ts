import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { ClientList } from '../features/client/client-list/client-list';
import { ClientDetailed } from '../features/client/client-detailed/client-detailed';
import { authGuard } from '../core/guards/auth-guard';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
import { ClientEdit } from '../features/client/client-edit/client-edit';
import { clientResolver } from '../features/client/client-resolver';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'clients', component: ClientList, canActivate: [authGuard] },
    {
        path: 'clients/:id',
        resolve: { client: clientResolver },
        runGuardsAndResolvers: 'always',
        component: ClientDetailed,
        children: [
            { path: 'edit', component: ClientEdit, title: 'Edit-Client' }
        ],
        canActivate: [authGuard]
    },
    { path: 'server-error', component: ServerError },
    { path: '**', component: NotFound }
];
