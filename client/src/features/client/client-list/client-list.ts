import { Component, computed, inject, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { Client, ClientStatus } from '../../../types/client';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastService } from '../../../core/services/toast-service';

type StatusFilter = 'All' | Client['currentStatus'];

@Component({
  selector: 'app-client-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList {
  protected clientService = inject(ClientService);
  protected toast = inject(ToastService);
  protected clientStatus = ClientStatus

  private readonly pageSize = 20;
  protected clients = signal<Client[]>([]);
  protected search = signal('');
  private page = signal(1);

  protected statusOptions: StatusFilter[] = ['All', 'Active', 'Expired', 'Frozen', 'Cancelled'];
  protected statusFilter = signal<StatusFilter>('All');

  // Member counts per status, shown next to each option
  protected counts = computed(() => {
    const totals: Record<StatusFilter, number> = {
      All: this.clients().length, Active: 0, Expired: 0, Frozen: 0, Cancelled: 0,
    };
    for (const client of this.clients()) totals[client.currentStatus]++;
    return totals;
  });


  protected filtered = computed(() => {
    const status = this.statusFilter();
    let list = this.clients();
    if (status !== 'All') list = list.filter(c => c.currentStatus === status);

    const q = this.search().trim().toLowerCase();
    if (!q) return list;
    const digits = q.replace(/\D/g, '');
    return list.filter(c =>
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (digits.length > 0 && c.phoneNumber.replace(/\D/g, '').includes(digits)));
  });

  protected totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  protected currentPage = computed(() => Math.min(this.page(), this.totalPages()));
  protected paged = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  constructor() {
    this.load();
  }

  private load() {
    this.clientService.getClients().subscribe({
      next: list => this.clients.set(list),
    });
  }

  protected onSearch(value: string) {
    this.search.set(value);
    this.page.set(1);
  }

  protected onStatusChange(value: string) {
    this.statusFilter.set(value as StatusFilter);
    this.page.set(1);
  }

  protected goTo(page: number) {
    this.page.set(page);
  }

  deleteClient(client: Client): void {
    if (confirm("Are you sure you want to delete " + client.fullName)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: response => {
          this.toast.success("Client deleted successfully");
          this.load();
        },
        error: error => this.toast.error(error)
      });
    }
  }

}
