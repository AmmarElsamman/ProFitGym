import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ClientService } from '../../core/services/client-service';
import { Client } from '../../types/client';
import { EMPTY } from 'rxjs';

export const clientResolver: ResolveFn<Client> = (route, state) => {
  const clientService = inject(ClientService);
  const router = inject(Router);
  const clientId = route.paramMap.get('id');

  if (!clientId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return clientService.getClientById(clientId);
};
