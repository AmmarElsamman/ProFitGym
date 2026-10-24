import { Component, inject, OnDestroy } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { Observable } from 'rxjs';
import { Client, ClientStatus } from '../../../types/client';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-client-list',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {
  protected clientService = inject(ClientService);
  protected toast = inject(ToastService);
  protected clients$: Observable<Client[]>;
  protected clientStatus = ClientStatus

  constructor() {
    this.clients$ = this.clientService.getClients();
  }

  deleteClient(client: Client): void {
    if (confirm("Are you sure you want to delete " + client.fullName)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: response => {
          this.toast.success("Client deleted successfully");
          this.clients$ = this.clientService.getClients();
        },
        error: error => this.toast.error(error)
      });
    }
  }

}
