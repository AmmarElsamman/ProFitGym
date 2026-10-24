import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Client } from '../../../types/client';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-client-detailed',
  imports: [AsyncPipe, DatePipe, RouterLink, RouterOutlet],
  templateUrl: './client-detailed.html',
  styleUrl: './client-detailed.css',
})
export class ClientDetailed implements OnInit {
  private clientService = inject(ClientService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected client = signal<Client | undefined>(undefined);
  protected qrCode$?: Observable<string>;
  protected showEdit = computed(() => this.clientService.editMode());

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.client.set(data['client'])
    })
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.qrCode$ = this.clientService.getClientQrCode(id).pipe(
      map(response => response.qrCode)
    );
  }

  toggleEdit(): void {
    this.clientService.editMode.set(!this.clientService.editMode());
  }

  deleteClient(client: Client): void {
    if (confirm("Are you sure you want to delete " + client.fullName)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: response => {
          this.router.navigateByUrl('/clients');
          this.toast.success("Client deleted successfully");
        },
        error: error => this.toast.error(error)
      });
    }
  }

}
